import { useEffect } from "react";
import { client } from "@/core/axios/main";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthProvider";
import { saveAuthData } from "@/lib/utils";

export const Redirection = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const githubAuth = async () => {
      await client.get(`/auth/login/github?${urlParams.toString()}`).then((data) => {
        if (data.data) {
          saveAuthData(data.data.accessToken);
          navigate("/dashboard/overview");
        }
      });
    };
    githubAuth();
  }, [navigate, setToken]);

  return <div>You are redirected to the Dashboard</div>;
};
