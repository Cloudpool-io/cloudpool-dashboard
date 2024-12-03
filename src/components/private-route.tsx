import { useAuth } from "@/context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { token } = useAuth();

  if (!token) return <Navigate to="/auth/login" />;
  return <Outlet />;
};
