import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Aquí podrías hacer una llamada al backend para verificar el token y obtener el rol
      const decoded = decodeToken(token); // Función para decodificar el token
      setIsAuthenticated(true);
      setRole(decoded.role);
    } else {
      setIsAuthenticated(false);
      setRole(null);
      history("/login");
    }
  }, [history]);

  return { isAuthenticated, role };
}

function decodeToken(token: string) {
  // Decodificar el token y obtener el rol
  // Implementa la lógica aquí
  return JSON.parse(atob(token.split(".")[1])); // Decodifica el JWT
}
