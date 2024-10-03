import React, { useState } from "react";
import AdminSidebar from "./SideBarAdmin/SideBarAdmin";
import UserManagementCard from "./UserManagement/UserManagementCard";
import OrderQueueCard from "./OrderQueue/OrderQueueCard";
import MenuManagementCard from "./MenuManagement/MenuManagementCard";
import ReportManagementCard from "./ReportManagement/ReportManagementCard";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("users");

  return (
    <div className="flex">
      {/* Sidebar del Administrador */}
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Contenido dinámico basado en la sección seleccionada */}
      <div className="flex-1 p-8">
        {/* Layout de 2 columnas y 2 filas para las cards */}
        <div className="grid grid-cols-2 gap-6">
          <UserManagementCard />
          <OrderQueueCard />
          <MenuManagementCard />
          <ReportManagementCard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
