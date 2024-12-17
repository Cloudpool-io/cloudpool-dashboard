import { useEffect } from "react";
import { client } from "@/core/axios/main";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthProvider";
import { getMe } from "@/api/auth/authService";
import { Contributor } from "@/core/interfaces/contributor.interface";
import { saveAuthData } from "@/lib/utils";

export const Redirection = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const githubAuth = async () => {
      await client.get(`/auth/login/github?${code}`).then((data) => {
        console.log(data);
        if (data.data) {
          saveAuthData(data.data.accessToken);
          getMe().then((user: Contributor) => {
            console.log(user);
            setToken(data.data.accessToken);
            setUser(user);
            navigate("/dashboard/overview");
          });
        }
      });
    };
    githubAuth();
  }, [navigate, setToken]);

  return <div>You are redirected to the Dashboard</div>;
};
