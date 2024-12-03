import { env } from "@/core/env";
import { useToast } from "@/hooks/use-toast";
import { loginFormInputs } from "@/pages/auth/form";
import { useContext, createContext, FC, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router";
const AuthContext = createContext({
  token: "",
  user: {},
  signIn: (data: loginFormInputs) => Promise.resolve(),
  signUp: (data: loginFormInputs) => Promise.resolve(),
  logout: () => { },
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useCookies(["user"]);

  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (cookies.token) {
      if (!location.pathname.startsWith("/dashboard")) {
        navigate("/dashboard");
      }
    }
  }, [cookies.token, location.pathname, navigate]);

  const signIn = async (data: loginFormInputs) => {
    const response = await fetch(`${env.api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = (await response.json()) as {
      code?: number;
      message?: string;
      token?: string;
    };
    if (json?.code) {
      toast({
        title: "Error",
        description: json.message,
        variant: "destructive",
      });
    } else {
      setCookies("token", json.token, { path: "/" });
      const me = await fetch(`${env.api}/contributors/me`, {
        credentials: "include",
        headers: {
          Content: "application/json",
          Cookies: `token=${json.token}`,
        },
      });
      const meJson = await me.json();
      setUser("user", JSON.stringify(meJson), { path: "/" });
      navigate("/dashboard");
    }
  };
  const signUp = async (data: loginFormInputs) => {
    const response = await fetch(`${env.api}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json?.code) {
      toast({
        title: "Error",
        description: json.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      navigate("/auth/login");
    }
  };
  const logout = () => {
    removeCookie("token", { path: "/" });
    navigate("/auth/login");
  };
  return (
    <AuthContext.Provider
      value={{ token: cookies.token, signIn, signUp, logout, user: user.user }}
    >
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => {
  return useContext(AuthContext);
};
