import { createContext, FC, useContext, useEffect, useMemo, useState } from "react";
import { clearAuthData, getAuthData } from "@/lib/utils";
import { Contributor } from "@/core/interfaces/contributor.interface";

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  setToken: () => {},
  logout: () => {},
});

interface AuthContextType {
  logout: () => void;
  token: string | null;
  user: Contributor | null;
  setToken: (token: string | null) => void;
}
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("accessToken"));
  const [user, setUser] = useState<Contributor | null>(null);

  useEffect(() => {
    const { token, user } = getAuthData();
    setToken(token);
    setUser(user);
  }, []);

  const logout = () => {
    clearAuthData();
    setToken(null);
  };

  const contextValue: AuthContextType = useMemo(
    () => ({
      token,
      user,
      setToken,
      logout,
    }),
    [token, user],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
