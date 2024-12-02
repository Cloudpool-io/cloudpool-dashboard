import { Routes, Route, Navigate } from "react-router";
import { Layout } from "./pages/layout";
import { AuthLayout } from "./pages/auth/layout";
import { Login } from "./pages/auth/login";
import { DashboardLayout } from "./pages/dashboard/layout";
import { LeaderBoard } from "./pages/dashboard/leaderboard/main";
import { Overview } from "./pages/dashboard/overview/main";
import { AddContributionFormPage } from "./pages/dashboard/contribute/add";
import { PrivateRoute } from "./components/private-route";
import { Register } from "./pages/auth/register";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="leaderboard" element={<LeaderBoard />} />
            <Route
              path="contribute/add"
              element={<AddContributionFormPage />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
