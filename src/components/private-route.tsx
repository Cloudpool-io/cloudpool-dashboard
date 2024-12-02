import { useAuth } from "@/context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const user = useAuth();

  if (!user.token) return <Navigate to="/auth/login" />;
  return <Outlet />;
};
