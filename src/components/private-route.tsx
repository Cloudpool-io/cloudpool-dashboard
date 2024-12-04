import { useAuth } from "@/context/AuthProvider";
import { Outlet, redirect } from "react-router-dom";

export const PrivateRoute = () => {
  const { token } = useAuth();
  if (!token) {
    redirect("/auth/login");
  }

  return <Outlet />;
};
