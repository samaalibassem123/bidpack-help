"use client";
import {
  TimelineSteps,
  TimelineStepsConnector,
  TimelineStepsContent,
  TimelineStepsDescription,
  TimelineStepsHeader,
  TimelineStepsIcon,
  TimelineStepsItem,
  TimelineStepsTime,
  TimelineStepsTitle,
} from "@/components/ui/timeline-steps";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import SlideUpScrollAnimation from "./animation/SlideUpScrollAnimation";
import { Scrollspy } from "./reui/scrollspy";
import { ScrollArea } from "./ui/scroll-area";
import ImageBox from "./ImageBox";

export interface TimeLineItem {
  step: string;
  icon: string | React.ReactNode;
  title: string;
  description: string | React.ReactNode;
  img_url: string;
}

interface Props {
  timelineItems: TimeLineItem[];
}

export default function TimeLine({ ...props }: Props) {
  const containerRef = useRef(null);
  return (
    <div className="flex relative flex-row-reverse w-full h-full justify-between">
      <Scrollspy
        className="flex-col ml-2 lg:flex hidden  space-y-3"
        offset={50}
        targetRef={containerRef}
      >
        {props.timelineItems.map((item) => (
          <a
            key={item.step}
            href={`#${item.step}`}
            data-scrollspy-anchor={item.step}
            className={cn(
              "flex gap-2 items-center transition-all data-[active=true]:scale-105 p-2 rounded-lg text-nowrap data-[active=true]:text-primary font-light text-sm "
            )}
          >
            <TimelineStepsIcon size={"sm"} className="bg-accent">
              {item.icon}
            </TimelineStepsIcon>
            {item.title}
          </a>
        ))}
      </Scrollspy>

      <TimelineSteps className="w-full">
        <div ref={containerRef} className=" w-full  grow">
          <ScrollArea
            onWheel={(e) => e.stopPropagation()}
            className=" h-[90svh]  "
          >
            <div className=" space-y-3">
              {props.timelineItems.map((item) => (
                <div id={item.step} key={item.step}>
                  <SlideUpScrollAnimation key={item.step}>
                    <TimelineStepsItem>
                      <TimelineStepsConnector />
                      <TimelineStepsHeader>
                        <TimelineStepsIcon>{item.icon}</TimelineStepsIcon>
                        <TimelineStepsTitle className=" font-semibold text-lg">
                          {item.title}
                        </TimelineStepsTitle>
                      </TimelineStepsHeader>
                      <TimelineStepsContent>
                        <TimelineStepsDescription className=" tracking-wide font-light p-3 whitespace-pre-line sm:w-sm">
                          {item.description}
                        </TimelineStepsDescription>
                        <ImageBox img_url={item.img_url} />
                      </TimelineStepsContent>
                    </TimelineStepsItem>
                  </SlideUpScrollAnimation>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </TimelineSteps>
    </div>
  );
}
