import { getMe } from "@/api/auth/authService";
import { useAuth } from "@/context/AuthProvider";
import { client } from "@/core/axios/main";
import { saveAuthData } from "@/lib/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GitHubAuth = () => {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const githubAuth = async () => {
      if (!code) return;

      try {
        const { data } = await client.get(`/auth/login/github?code=${code}`);

        if (data?.accessToken) {
          saveAuthData(data.accessToken);
          setToken(data.accessToken);

          const user = await getMe();
          setUser(user);
          navigate("/dashboard/overview");
        }
      } catch (error) {
        console.error("GitHub Auth failed:", error);
      }
    };

    githubAuth();
  }, [client, saveAuthData, setToken, setUser, navigate]);

  return null; // Or any loading indicator
};
