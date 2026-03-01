"use client";
import Logo from "@/components/ui/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

import { usePathname } from "next/navigation";

interface Item {
  title: string;
  url: string;
  icon?: string;
}

const items: Item[] = [
  {
    title: "Introduction",
    url: "/",
  },
  {
    title: "Authentication",
    url: "/auth",
  },
  {
    title: "Build Company Profile",
    url: "/company-profile",
  },
  {
    title: "Studios & Vendors",
    url: "/studio-vendors",
  },
  {
    title: "Vendor Pool",
    url: "/vendor-pool",
  },
  {
    title: "Set up Projects",
    url: "/projects",
  },
  {
    title: "Manage Tasks & Outsourcing",
    url: "/tasks",
  },
  {
    title: "Communication",
    url: "/communication",
  },
  {
    title: "Vendor Availability by Service",
    url: "/vendor-availability",
  },
];

interface Props {
  children: React.ReactNode;
}
export default function SideBarMenu({ children }: Props) {
  const [active, setActive] = useState(null);
  const pathname = usePathname();

  return (
    <main className="w-full">
      <SidebarProvider>
        <Sidebar variant="sidebar">
          <SidebarHeader className="  flex items-center justify-center">
            <Logo id="help logo" className="w-30 h-10" />
          </SidebarHeader>
          <Separator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="gap-1 text-lg  ">
                Bidpack Help
              </SidebarGroupLabel>

              <SidebarGroupContent className="pl-3 mt-5 ">
                <SidebarMenu className=" space-y-3">
                  {items.map((item, i) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className={cn(
                          " relative transition-all rounded-xl ",
                          item.url === pathname &&
                            " bg-accent text-primary  scale-101"
                        )}
                        render={<Link href={item.url} />}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <div className=" p-4">
              <Link
                href={"/"}
                className="flex gap-1 items-center hover:gap-2 group-hover transition-all duration-150"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold text-sm">
                  Go back to home page
                </span>
              </Link>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className=" w-full h-svh">
          <div className=" border-b p-2 sticky top-0 backdrop-blur-2xl">
            <SidebarTrigger className="    cursor-pointer hover:bg-accent" />
          </div>

          {/* Main content going here */}
          <div className="  p-2 pt-4">{children}</div>
        </main>
      </SidebarProvider>
    </main>
  );
}
