import { PrivateRoute } from "@/components/private-route";
import { PublicRoute } from "@/components/public-routes";
import { AuthLayout } from "@/pages/auth/layout";
import { Login } from "@/pages/auth/login";
import { Register } from "@/pages/auth/register";
import { AddContributionFormPage } from "@/pages/dashboard/contributions/contribute/add";
import { Contributions } from "@/pages/dashboard/contributions/main";
import { DashboardLayout } from "@/pages/dashboard/layout";
import { LeaderBoard } from "@/pages/dashboard/leaderboard/main";
import { Overview } from "@/pages/dashboard/overview/main";
import { Layout } from "@/pages/layout";
import { Navigate, Route, Routes } from "react-router";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PublicRoute />}>
          <Route index element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="leaderboard" element={<LeaderBoard />} />
            <Route path="contributions" element={<Contributions />} />
            <Route
              path="contribute/add"
              element={<AddContributionFormPage />}
            />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Route>
    </Routes>
  );
};
