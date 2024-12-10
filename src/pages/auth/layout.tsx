import { Typography } from "@/components/ui/typography";
import { Cloud } from "lucide-react";
import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="grid-cols-auto grid min-h-screen md:grid-cols-[1fr_1fr]">
      <div className="hidden flex-col justify-between bg-black p-4 md:flex">
        <div className="flex items-center gap-4">
          <Cloud size="64" color="white" />
          <div className="text-4xl text-white">Cloudpool</div>
        </div>
        <Typography as="h2" variant="h2" className="text-white">
          Welcome to Cloudpool! Please login to continue.
        </Typography>
        <div>
          <blockquote className="mt-6 border-l-2 pl-6 text-sm italic text-white">
            "Cloudpool is on a mission to create an open dataset on cloud performance so you can make an educated
            decision when choosing your provider. You input your unused credentials to earn rewards, we benchmark those
            machines and publish the data. Contribute to the mission of transparent cloud!"
          </blockquote>
        </div>
      </div>
      <div className="grid place-items-center">
        <Outlet />
      </div>
    </div>
  );
};
