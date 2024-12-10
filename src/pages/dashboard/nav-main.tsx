import { type LucideIcon } from "lucide-react";

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { NavLink } from "react-router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <div key={item.url}>
            {isMobile ? (
              <SidebarMenuItem onClick={() => setOpenMobile(false)}>
                <NavLink to={item.url}>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </NavLink>
              </SidebarMenuItem>
            ) : (
              <SidebarMenuItem>
                <NavLink to={item.url}>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </NavLink>
              </SidebarMenuItem>
            )}
          </div>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
