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
    title: "1.Authentication",
    url: "/auth",
  },
  {
    title: "2.Build Company Profile",
    url: "/",
  },
  {
    title: "3.Studios & Vendors",
    url: "/",
  },
  {
    title: "4.Vendor Pool",
    url: "/",
  },
  {
    title: "5.Set up Projects",
    url: "/",
  },
  {
    title: "6.Assign Vendors",
    url: "/",
  },
  {
    title: "7.Manage Tasks & Outsourcing",
    url: "/",
  },
  {
    title: "8.Communication",
    url: "/",
  },
  {
    title: "9.Vendor Availability by Service",
    url: "/",
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
        <Sidebar
          className="  bg-gradient-to-b backdrop-blur-2xl from-black/20  to-background/20 "
          variant="sidebar"
        >
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
                <SidebarMenu>
                  {items.map((item, i) => (
                    <SidebarMenuItem
                      className={cn(
                        " relative  rounded-lg  transition-all p-2",
                        item.url === pathname && "font-[540] text-primary"
                      )}
                      key={item.title}
                    >
                      <SidebarMenuButton
                        isActive={pathname === item.url}
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

        <main className=" w-full h-full p-2">
          <SidebarTrigger className="  cursor-pointer hover:bg-accent" />

          {/* Main content going here */}
          <div className=" mb-30 p-4 pt-20 max-h-full">{children}</div>
        </main>
      </SidebarProvider>
    </main>
  );
}
