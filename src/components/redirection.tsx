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
    console.log(code);

    const githubAuth = async () => {
      await client.get(`/auth/login/github?${code}`).then((data) => {
        console.log(data);
        if (data.data) {
          setToken(data.data.accessToken);
          navigate("/dashboard/overview");
        }
      });
    };
    githubAuth();
  }, [navigate, setToken]);

  return <div>You are redirected to the Dashboard</div>;
};
