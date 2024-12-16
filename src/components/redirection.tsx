import { useEffect } from "react";
import { client } from "@/core/axios/main";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthProvider";

export const Redirection = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    client.get(`/auth/login/github?${code}`).then((data) => {
      if (data.data) {
        setToken(data.data.accessToken);
        navigate("/dashboard/overview");
      }
    });
  }, [navigate, setToken]);

  return <div>You are redirected to the Dashboard</div>;
};
