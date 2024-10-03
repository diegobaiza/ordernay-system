import React, { useState } from "react";
import AdminSidebar from "../SideBarAdmin/SideBarAdmin";
import UserTable from "./UserTable/UserTable";
import { User } from "../UserManagement/UserInterface";
import { Header } from "../../- subComponents/Header/Header";
import { useAuth } from "../../../hooks/useAuth/useAuth";

// Datos de usuarios de ejemplo
const users: User[] = [
  {
    name: "Juan Diego Baiza Perdomo",
    username: "baizadiego",
    role: "Administrador",
    status: "activo",
  },
  {
    name: "Walter David Oliva Franco",
    username: "olivadavid",
    role: "Mesero",
    status: "activo",
  },
  {
    name: "Mayorin Estefani Flores Vazques",
    username: "floresmayorin",
    role: "Cocinero",
    status: "activo",
  },
  {
    name: "Edvin Eduardo Díaz Reynosa",
    username: "reynosaeduardo",
    role: "Bartender",
    status: "inactivo",
  },
];

const UserManagementPage: React.FC = () => {
  // Estado para controlar la sección activa
  const [activeSection, setActiveSection] = useState<string>("users");

  // Obtenemos el rol del usuario logueado
  const { role } = useAuth(); // El contexto maneja el rol

  return (
    <div className="flex flex-col">
      {/* Header dinámico basado en el rol del usuario */}
      <Header /> {/* Eliminamos el paso del prop `role` */}
      <div className="flex">
        {/* Sidebar con las props necesarias */}
        <AdminSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Contenido principal */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-semibold mb-4">Gestión de Usuarios</h2>

          {/* Tabla de Usuarios */}
          <UserTable users={users} />
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
