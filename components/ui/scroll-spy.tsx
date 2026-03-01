"use client";

import {
  Direction as DirectionPrimitive,
  Slot as SlotPrimitive,
} from "radix-ui";
import * as React from "react";
import { useComposedRefs } from "@/lib/compose-refs";
import { cn } from "@/lib/utils";
import { useAsRef } from "@/hooks/use-as-ref";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { useLazyRef } from "@/hooks/use-lazy-ref";

const ROOT_NAME = "ScrollSpy";
const NAV_NAME = "ScrollSpyNav";
const LINK_NAME = "ScrollSpyLink";
const VIEWPORT_NAME = "ScrollSpyViewport";
const SECTION_NAME = "ScrollSpySection";

type Direction = "ltr" | "rtl";
type Orientation = "horizontal" | "vertical";

type LinkElement = React.ComponentRef<typeof ScrollSpyLink>;
type SectionElement = React.ComponentRef<typeof ScrollSpySection>;

function getDefaultScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "smooth";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

interface StoreState {
  value: string;
}

interface Store {
  subscribe: (callback: () => void) => () => void;
  getState: () => StoreState;
  setState: <K extends keyof StoreState>(key: K, value: StoreState[K]) => void;
  notify: () => void;
}

const StoreContext = React.createContext<Store | null>(null);

function useStore<T>(
  selector: (state: StoreState) => T,
  ogStore?: Store | null
): T {
  const contextStore = React.useContext(StoreContext);

  const store = ogStore ?? contextStore;

  if (!store) {
    throw new Error(`\`useStore\` must be used within \`${ROOT_NAME}\``);
  }

  const getSnapshot = React.useCallback(
    () => selector(store.getState()),
    [store, selector]
  );

  return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

interface ScrollSpyContextValue {
  offset: number;
  scrollBehavior: ScrollBehavior;
  dir: Direction;
  orientation: Orientation;
  scrollContainer: HTMLElement | null;
  isScrollingRef: React.RefObject<boolean>;
  onSectionRegister: (id: string, element: SectionElement) => void;
  onSectionUnregister: (id: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

const ScrollSpyContext = React.createContext<ScrollSpyContextValue | null>(
  null
);

function useScrollSpyContext(consumerName: string) {
  const context = React.useContext(ScrollSpyContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${ROOT_NAME}\``);
  }
  return context;
}

interface ScrollSpyProps extends React.ComponentProps<"div"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  rootMargin?: string;
  threshold?: number | number[];
  offset?: number;
  scrollBehavior?: ScrollBehavior;
  scrollContainer?: HTMLElement | null;
  dir?: Direction;
  orientation?: Orientation;
  asChild?: boolean;
}

function ScrollSpy(props: ScrollSpyProps) {
  const {
    value,
    defaultValue,
    onValueChange,
    rootMargin,
    threshold = 0,
    offset = 0,
    scrollBehavior = getDefaultScrollBehavior(),
    scrollContainer = null,
    dir: dirProp,
    orientation = "horizontal",
    asChild,
    className,
    ...rootProps
  } = props;

  const dir = DirectionPrimitive.useDirection(dirProp);

  const stateRef = useLazyRef<StoreState>(() => ({
    value: value ?? defaultValue ?? "",
  }));
  const listenersRef = useLazyRef(() => new Set<() => void>());
  const onValueChangeRef = useAsRef(onValueChange);

  const store = React.useMemo<Store>(() => {
    return {
      subscribe: (cb) => {
        listenersRef.current.add(cb);
        return () => listenersRef.current.delete(cb);
      },
      getState: () => {
        return stateRef.current;
      },
      setState: (key, value) => {
        if (Object.is(stateRef.current[key], value)) return;

        stateRef.current[key] = value;

        if (key === "value" && value) {
          onValueChangeRef.current?.(value);
        }

        store.notify();
      },
      notify: () => {
        for (const cb of listenersRef.current) {
          cb();
        }
      },
    };
  }, [listenersRef, stateRef, onValueChangeRef]);

  const sectionMapRef = React.useRef(new Map<string, Element>());
  const isScrollingRef = React.useRef(false);
  const rafIdRef = React.useRef<number | null>(null);
  const isMountedRef = React.useRef(false);
  const scrollTimeoutRef = React.useRef<number | null>(null);

  const onSectionRegister = React.useCallback(
    (id: string, element: SectionElement) => {
      sectionMapRef.current.set(id, element);
    },
    []
  );

  const onSectionUnregister = React.useCallback((id: string) => {
    sectionMapRef.current.delete(id);
  }, []);

  /**
   * Check if the scroll container (or window) is scrolled to the bottom.
   * A small tolerance of 2px is used to account for sub-pixel rounding.
   */
  const isAtBottom = React.useCallback(() => {
    if (scrollContainer) {
      return (
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - 2
      );
    }
    return (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2
    );
  }, [scrollContainer]);

  /**
   * After a programmatic or fast scroll settles, re-evaluate which section
   * is currently closest to the top of the viewport / scroll container.
   *
   * KEY FIX: When scrolled to the bottom, activate the last section
   * regardless of whether its top edge reached the trigger line.
   * This ensures sections 4, 5, etc. that can't scroll to the top
   * are still activatable.
   */
  const syncActiveSection = React.useCallback(() => {
    const sectionMap = sectionMapRef.current;
    if (sectionMap.size === 0) return;

    // If we're at the very bottom of the scroll container, activate the last section
    if (isAtBottom()) {
      const entries = Array.from(sectionMap.entries());
      const lastId = entries[entries.length - 1]?.[0];
      if (lastId) {
        store.setState("value", lastId);
        return;
      }
    }

    // Use the middle of the viewport (or scroll container) as the trigger line
    const containerRect = scrollContainer
      ? scrollContainer.getBoundingClientRect()
      : { top: 0, height: window.innerHeight };

    const triggerLine = containerRect.top + containerRect.height / 2;

    let bestId: string | null = null;
    let bestDistance = Infinity;

    for (const [id, el] of sectionMap) {
      const rect = el.getBoundingClientRect();

      if (rect.top <= triggerLine) {
        // Section whose top has crossed the middle line — prefer the one
        // closest to (but not past) the middle.
        const aboveDistance = triggerLine - rect.top;
        if (aboveDistance < bestDistance) {
          bestDistance = aboveDistance;
          bestId = id;
        }
      } else if (bestId === null) {
        // Nothing crossed the middle yet — fall back to the closest below
        const distance = rect.top - triggerLine;
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      }
    }

    if (bestId) {
      store.setState("value", bestId);
    }
  }, [scrollContainer, store, isAtBottom]);

  const onScrollToSection = React.useCallback(
    (sectionId: string) => {
      const section = scrollContainer
        ? scrollContainer.querySelector(`#${sectionId}`)
        : document.getElementById(sectionId);

      if (!section) {
        store.setState("value", sectionId);
        return;
      }

      // Set flag to prevent observer from firing during programmatic scroll
      isScrollingRef.current = true;
      store.setState("value", sectionId);

      if (scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        const scrollTop = scrollContainer.scrollTop;
        const offsetPosition =
          sectionRect.top - containerRect.top + scrollTop - offset;

        scrollContainer.scrollTo({
          top: offsetPosition,
          behavior: scrollBehavior,
        });
      } else {
        const sectionPosition = section.getBoundingClientRect().top;
        const offsetPosition = sectionPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: scrollBehavior,
        });
      }

      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
        // Re-sync after programmatic scroll settles in case smooth scroll
        // ended slightly off the target
        syncActiveSection();
      }, 500);
    },
    [scrollContainer, offset, scrollBehavior, store, syncActiveSection]
  );

  useIsomorphicLayoutEffect(() => {
    const currentValue = value ?? defaultValue;
    if (currentValue === undefined) return;

    if (!isMountedRef.current) {
      isMountedRef.current = true;
      store.setState("value", currentValue);
      return;
    }

    onScrollToSection(currentValue);
  }, [value, onScrollToSection]);

  useIsomorphicLayoutEffect(() => {
    const sectionMap = sectionMapRef.current;
    if (sectionMap.size === 0) return;

    /**
     * Trigger when section crosses the middle of the viewport.
     * `-50%` on both top and bottom creates a 0-height trigger line
     * exactly at the center. The offset shifts that line up if needed.
     */
    const observerRootMargin = rootMargin ?? `-${50 + offset}% 0px -100% 0px`;
    const scrollTarget = scrollContainer ?? window;

    // ------------------------------------------------------------------
    // Scroll-end fallback: catches sections missed when scrolling fast,
    // and crucially handles bottom sections that can't reach the trigger line.
    // ------------------------------------------------------------------
    let scrollEndTimeout: number | null = null;

    const onScrollEnd = () => {
      if (isScrollingRef.current) return; // programmatic scroll — skip
      syncActiveSection();
    };

    const onScroll = () => {
      if (isScrollingRef.current) return;
      // Debounce with a short delay as a polyfill for `scrollend`
      if (scrollEndTimeout !== null) clearTimeout(scrollEndTimeout);
      scrollEndTimeout = window.setTimeout(onScrollEnd, 0);
    };

    // Use native `scrollend` where available, fall back to debounced `scroll`
    const supportsScrollEnd = "onscrollend" in window;
    if (supportsScrollEnd) {
      scrollTarget.addEventListener("scrollend", onScrollEnd);
    } else {
      scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    }

    // ------------------------------------------------------------------
    // IntersectionObserver — still the primary mechanism for normal scrolling.
    // ------------------------------------------------------------------
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }

        rafIdRef.current = requestAnimationFrame(() => {
          const intersecting = entries.filter((entry) => entry.isIntersecting);

          if (intersecting.length === 0) return;

          const topmost = intersecting.reduce((prev, curr) => {
            return curr.boundingClientRect.top < prev.boundingClientRect.top
              ? curr
              : prev;
          });

          const id = topmost.target.id;
          if (id && sectionMap.has(id)) {
            store.setState("value", id);
          }
        });
      },
      {
        root: scrollContainer,
        rootMargin: observerRootMargin,
        threshold,
      }
    );

    for (const element of sectionMap.values()) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();

      if (supportsScrollEnd) {
        scrollTarget.removeEventListener("scrollend", onScrollEnd);
      } else {
        scrollTarget.removeEventListener("scroll", onScroll);
      }

      if (scrollEndTimeout !== null) clearTimeout(scrollEndTimeout);
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      if (scrollTimeoutRef.current !== null)
        clearTimeout(scrollTimeoutRef.current);
    };
  }, [offset, rootMargin, threshold, scrollContainer, syncActiveSection]);

  const contextValue = React.useMemo<ScrollSpyContextValue>(
    () => ({
      dir,
      orientation,
      offset,
      scrollBehavior,
      scrollContainer,
      isScrollingRef,
      onSectionRegister,
      onSectionUnregister,
      onScrollToSection,
    }),
    [
      dir,
      orientation,
      offset,
      scrollBehavior,
      scrollContainer,
      onSectionRegister,
      onSectionUnregister,
      onScrollToSection,
    ]
  );

  const RootPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <StoreContext.Provider value={store}>
      <ScrollSpyContext.Provider value={contextValue}>
        <RootPrimitive
          data-orientation={orientation}
          data-slot="scroll-spy"
          dir={dir}
          {...rootProps}
          className={cn(
            "flex",
            orientation === "horizontal" ? "flex-row" : "flex-col",
            className
          )}
        />
      </ScrollSpyContext.Provider>
    </StoreContext.Provider>
  );
}

interface ScrollSpyNavProps extends React.ComponentProps<"nav"> {
  asChild?: boolean;
}

function ScrollSpyNav(props: ScrollSpyNavProps) {
  const { asChild, className, ...navProps } = props;

  const { dir, orientation } = useScrollSpyContext(NAV_NAME);

  const NavPrimitive = asChild ? SlotPrimitive.Slot : "nav";

  return (
    <NavPrimitive
      data-orientation={orientation}
      data-slot="scroll-spy-nav"
      dir={dir}
      {...navProps}
      className={cn(
        "flex gap-2",
        orientation === "horizontal" ? "flex-col" : "flex-row",
        className
      )}
    />
  );
}

interface ScrollSpyLinkProps extends React.ComponentProps<"a"> {
  value: string;
  asChild?: boolean;
}

function ScrollSpyLink(props: ScrollSpyLinkProps) {
  const { value: linkValue, asChild, onClick, className, ...linkProps } = props;

  const { orientation, onScrollToSection } = useScrollSpyContext(LINK_NAME);
  const value = useStore((state) => state.value);
  const isActive = value === linkValue;

  const onLinkClick = React.useCallback(
    (event: React.MouseEvent<LinkElement>) => {
      event.preventDefault();
      onClick?.(event);
      onScrollToSection(linkValue);
    },
    [linkValue, onClick, onScrollToSection]
  );

  const LinkPrimitive = asChild ? SlotPrimitive.Slot : "a";

  return (
    <LinkPrimitive
      data-orientation={orientation}
      data-slot="scroll-spy-link"
      data-state={isActive ? "active" : "inactive"}
      {...linkProps}
      href={asChild ? undefined : `#${linkValue}`}
      className={cn(
        "rounded px-3 py-1.5 font-medium text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-accent data-[state=active]:text-foreground",
        className
      )}
      onClick={onLinkClick}
    />
  );
}

interface ScrollSpyViewportProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

function ScrollSpyViewport(props: ScrollSpyViewportProps) {
  const { asChild, className, ...viewportProps } = props;

  const { dir, orientation } = useScrollSpyContext(VIEWPORT_NAME);

  const ViewportPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <ViewportPrimitive
      data-orientation={orientation}
      data-slot="scroll-spy-viewport"
      dir={dir}
      {...viewportProps}
      className={cn("flex flex-1 flex-col gap-8", className)}
    />
  );
}

interface ScrollSpySectionProps extends React.ComponentProps<"div"> {
  value: string;
  asChild?: boolean;
}

function ScrollSpySection(props: ScrollSpySectionProps) {
  const { asChild, ref, value, ...sectionProps } = props;

  const { orientation, onSectionRegister, onSectionUnregister } =
    useScrollSpyContext(SECTION_NAME);
  const sectionRef = React.useRef<SectionElement>(null);
  const composedRef = useComposedRefs(ref, sectionRef);

  useIsomorphicLayoutEffect(() => {
    const element = sectionRef.current;
    if (!element || !value) return;

    onSectionRegister(value, element);

    return () => {
      onSectionUnregister(value);
    };
  }, [value, onSectionRegister, onSectionUnregister]);

  const SectionPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <SectionPrimitive
      data-orientation={orientation}
      data-slot="scroll-spy-section"
      {...sectionProps}
      id={value}
      ref={composedRef}
    />
  );
}

export {
  ScrollSpy,
  ScrollSpyLink,
  ScrollSpyNav,
  ScrollSpySection,
  ScrollSpyViewport,
  //
  type ScrollSpyProps,
};
