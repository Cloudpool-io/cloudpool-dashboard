import { useAuth } from "@/context/AuthProvider";
import { Navigate, Outlet } from "react-router";

export const PrivateRoute = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
};
