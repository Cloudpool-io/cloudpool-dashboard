import { useAuth } from "@/context/AuthProvider";
import { Navigate, Outlet } from "react-router";

export const PublicRoute = () => {
  const { token } = useAuth();
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
