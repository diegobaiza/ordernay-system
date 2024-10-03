import React from "react";
import { AdminSidebarProps } from "./SideBardAdminInterface";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  setActiveSection,
}) => {
  const navigate = useNavigate(); // Hook para redirigir

  return (
    <div className="w-1/4 h-screen bg-blue-100 p-6">
      <button
        className={`block w-full text-left p-2 mb-2 rounded ${
          activeSection === "users" ? "bg-blue-300" : ""
        }`}
        onClick={() => {
          setActiveSection("users");
          navigate("/administrador-dashboard"); // Redirigir al AdminDashboard
        }}
      >
        Dashboard
      </button>

      <button
        className={`block w-full text-left p-2 mb-2 rounded ${
          activeSection === "orders" ? "bg-blue-300" : ""
        }`}
        onClick={() => setActiveSection("orders")}
      >
        Mesero
      </button>

      <button
        className={`block w-full text-left p-2 mb-2 rounded ${
          activeSection === "menu" ? "bg-blue-300" : ""
        }`}
        onClick={() => setActiveSection("menu")}
      >
        Bartender
      </button>

      <button
        className={`block w-full text-left p-2 mb-2 rounded ${
          activeSection === "reports" ? "bg-blue-300" : ""
        }`}
        onClick={() => setActiveSection("reports")}
      >
        Cocinero
      </button>
    </div>
  );
};

export default AdminSidebar;
