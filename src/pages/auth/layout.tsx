import { Typography } from "@/components/ui/typography";
import { Cloud } from "lucide-react";
import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="grid grid-cols-auto md:grid-cols-[1fr_1fr] min-h-screen">
      <div className="bg-black p-4 flex-col justify-between hidden md:flex">
        <div className="gap-4 flex items-center">
          <Cloud size="64" color="white" />
          <div className="text-white text-4xl">Cloudpool</div>
        </div>
        <Typography as="h2" variant="h2" className="text-white">
          Welcome to Cloudpool! Please login to continue.
        </Typography>
        <div>
          <blockquote className="text-sm mt-6 border-l-2 pl-6 italic text-white">
            "Cloudpool is a cloud-based service that allows you to manage your
            cloud resources in one place."
          </blockquote>
        </div>
      </div>
      <div className="grid place-items-center">
        <Outlet />
      </div>
    </div>
  );
};
