import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router";
import { AppSidebar } from "./app-sidebar";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/context/auth";

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const handleNavigateToContribute = () => {
    navigate("/dashboard/contribute/add");
  };
  useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex flex-auto items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <Button onClick={handleNavigateToContribute}>Contribute</Button>
        </header>
        <div className="grid grid-cols-1 gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
