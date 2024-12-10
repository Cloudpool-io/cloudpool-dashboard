"use client";

import * as React from "react";
import { Cloud, Home, Trophy } from "lucide-react";

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
      title: "Overview",
      url: "/dashboard/overview",
      icon: Home,
      isActive: true,
    },
    {
      title: "Leaderboard",
      url: "/dashboard/leaderboard",
      icon: Trophy,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="inline-flex items-center gap-2">
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
