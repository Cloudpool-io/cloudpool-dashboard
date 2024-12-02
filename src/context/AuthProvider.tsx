import { useToast } from "@/hooks/use-toast";
import { loginFormInputs } from "@/pages/auth/form";
import { useContext, createContext, FC, useState, useEffect } from "react";
import { useNavigate } from "react-router";
const AuthContext = createContext({
  token: "",
  user: null,
  signIn: (data: loginFormInputs) => Promise.resolve(),
  signUp: (data: loginFormInputs) => Promise.resolve(),
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const { toast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  const signIn = async (data: loginFormInputs) => {
    const response = await fetch("https://dev.api.cloudpool.io/v1/auth/login", {
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
      localStorage.setItem("token", json.token);
      setToken(json.token);
      setUser(json.user);
      navigate("/dashboard");
    }
  };
  const signUp = async (data: loginFormInputs) => {
    const response = await fetch(
      "https://dev.api.cloudpool.io/v1/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
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
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    navigate("/auth/login");
  };
  return (
    <AuthContext.Provider value={{ token, user, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
