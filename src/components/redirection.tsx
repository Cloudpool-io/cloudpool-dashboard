import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthProvider";
import { getMe, githubSignIn } from "@/api/auth/authService";
import { Contributor } from "@/core/interfaces/contributor.interface";
import { CustomAxiosError } from "@/core/interfaces/error.interface";
import { useMutation } from "@tanstack/react-query";
import { saveAuthData } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export const Redirection = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: githubSignIn,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "You have logged in successfully",
      });
      if (data) {
        saveAuthData(data.accessToken);
        getMe().then((user: Contributor) => {
          setToken(data?.accessToken);
          setUser(user);
          navigate("/dashboard/overview");
        });
      }
    },
    onError: (error: CustomAxiosError) => {
      if (error.response?.data.code) {
        toast({
          title: "Failed",
          description: error.response.data.message,
          variant: "destructive",
        });
      }
    },
  });

  // Callback for GitHub login
  const callbackGithub = (code: string) => {
    mutate(code);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("code")) {
      const code = urlParams.get("code") || "";
      callbackGithub(code);
    }
  }, [callbackGithub]);

  return <div>You are redirected to the Dashboard</div>;
};
