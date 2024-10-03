import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext/AuthContext";

// Screens and Design
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import DashboardBCLayout from "./components/Dashboard_BC_layout/DashboardBCLayout";
import TableView from "./components/MeseroDashboard/TablesView/TableView";
import LoginPage from "./components/Login/LoginPage";
import { Header } from "./components/- subComponents/Header/Header";
import MenuView from "./components/MeseroDashboard/MenuView/MenuView";
import UserManagementPage from "./components/AdminDashboard/UserManagement/UserManagementPage";

const App = () => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  // Determina si mostrar el Header o no basado en la ruta actual
  const shouldShowHeader = [
    "/administrador-dashboard",
    "/mesero-dashboard",
    "/cocinero-dashboard",
    "/bartender-dashboard",
  ].includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={`/${role}-dashboard`} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to={`/${role}-dashboard`} />
            ) : (
              <LoginPage />
            )
          }
        />

        {/* Rutas para Admin, Cocinero, Bartender, Mesero */}
        <Route
          path="/administrador-dashboard"
          element={
            isAuthenticated && role === "administrador" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/mesero-dashboard"
          element={
            isAuthenticated && role === "mesero" ? (
              <TableView />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Usamos el mismo componente para cocinero y bartender */}
        <Route
          path="/cocinero-dashboard"
          element={
            isAuthenticated && role === "cocinero" ? (
              <DashboardBCLayout />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/bartender-dashboard"
          element={
            isAuthenticated && role === "bartender" ? (
              <DashboardBCLayout />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Otras rutas */}
        <Route
          path="/menu"
          element={
            isAuthenticated && role === "mesero" ? (
              <MenuView />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/user-management" element={<UserManagementPage />} />
      </Routes>
    </>
  );
};

export default App;
