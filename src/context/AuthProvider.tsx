import { createContext, FC, useContext, useEffect, useState } from "react";
import { clearAuthData, getAuthData, saveAuthData } from "@/lib/utils";
import {
  loginFormInputs,
  loginSchema,
  registerFormInputs,
  registerSchema,
} from "@/pages/auth/form";
import { client } from "@/core/axios/main";

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => { },
  signIn: async () => ({ accessToken: "", code: 0, message: "" }),
  signUp: async () => ({ code: 0, message: "", accessToken: "" }),
  logout: () => { },
});

interface AuthContextType {
  logout: () => void;
  signUp: (
    data: registerFormInputs,
  ) => Promise<{ code?: number; message?: string; accessToken?: string }>;
  signIn: (
    data: loginFormInputs,
  ) => Promise<{ code?: number; message?: string; accessToken?: string }>;
  token: string | null;
  setToken: (token: string | null) => void;
}
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("accessToken"),
  );

  const signIn = async (form: loginFormInputs) => {
    const validation = await loginSchema.safeParseAsync(form);
    if (!validation.success) {
      throw new Error("Validation error");
    }

    const result = await client.post(`/auth/login`, validation.data);
    if (result.status !== 201) {
      return {
        code: "Error",
        message: "Error",
      };
    }

    saveAuthData(result.data.accessToken);
    setToken(result.data.accessToken);

    return result.data;
  };

  const signUp = async (form: registerFormInputs) => {
    const validation = await registerSchema.safeParseAsync(form);
    if (!validation.success) {
      throw new Error("Validation error");
    }

    const response = await client.post(`/auth/signup`, form);

    return response.data as {
      code?: number;
      message?: string;
      accessToken?: string;
    };
  };

  const logout = () => {
    clearAuthData();
    setToken(null);
  };

  useEffect(() => {
    const { token } = getAuthData();
    setToken(token);
  }, []);

  const contextValue: AuthContextType = {
    setToken,
    token,
    signIn,
    signUp,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
