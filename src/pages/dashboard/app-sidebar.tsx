"use client";

import * as React from "react";
import { Cloud, Home } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { Typography } from "@/components/ui/typography";

const data = {
  navMain: [
    {
      title: "Main",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard/overview",
        },
        {
          title: "Leaderboard",
          url: "/dashboard/leaderboard",
        },
        {
          title: "Contributions",
          url: "/dashboard/contributions",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="inline-flex gap-2 items-center">
          <Cloud size={40} />
          {state === "expanded" && (
            <Typography as="h3" variant="h3">
              Cloudpool
            </Typography>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
