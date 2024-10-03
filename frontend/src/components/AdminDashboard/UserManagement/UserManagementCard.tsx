import React from "react";
import { useNavigate } from "react-router-dom";

const UserManagementCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/user-management"); // Redirigir a UserManagementPage
  };

  return (
    <div
      className="bg-blue-100 p-8 h-48 rounded-lg shadow-lg flex justify-center items-center cursor-pointer"
      onClick={handleClick}
    >
      <h2 className="text-4xl font-bold text-center">Gestión de Usuarios</h2>
    </div>
  );
};

export default UserManagementCard;
