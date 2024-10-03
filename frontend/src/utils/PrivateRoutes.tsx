// PrivateRoutes.tsx
import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext/AuthContext';

interface PrivateRouteProps {
  element: React.ReactElement;
  roleRequired?: string; // Opcional, para manejar roles específicos
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roleRequired, path }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Si no está autenticado, redirige al login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roleRequired && role !== roleRequired) {
    // Si el rol requerido no coincide, redirige a una página de error o inicio
    return <Navigate to="/403" replace />;
  }

  return <Route path={path} element={element} />;
};

export default PrivateRoute;
