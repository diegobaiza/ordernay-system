// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  usernameID: number | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [usernameID, setUsernameID] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUsernameID = localStorage.getItem("usernameID");

    if (token && storedRole && storedUsernameID) {
      setIsAuthenticated(true);
      setRole(storedRole);
      setUsernameID(Number(storedUsernameID));
    }
  }, []);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:3300/api/auth/login",
        { username, password }
      );
      const token = response.data?.token;
      const role = response.data?.user?.role;
      const userID = response.data?.user?.id;

      if (token && role && userID) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("usernameID", String(userID));
        setRole(role);
        setUsernameID(userID);
        setIsAuthenticated(true);
      } else {
        throw new Error("El token o el rol no están definidos");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      throw new Error("Error en el inicio de sesión");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("usernameID");
    setIsAuthenticated(false);
    setRole(null);
    setUsernameID(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, usernameID, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
