import React from "react";
import { Link } from "react-router-dom";

export const DashboardOrdernay = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Link
        to="/admin-dashboard"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Admin Dashboard
      </Link>
      <Link
        to="/mesero-dashboard"
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
      >
        Mesero Dashboard
      </Link>
      <Link
        to="/cocinero-dashboard"
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
      >
        Cocinero Dashboard
      </Link>
      <Link
        to="/bartender-dashboard"
        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
      >
        Bartender Dashboard
      </Link>
    </div>
  );
};
