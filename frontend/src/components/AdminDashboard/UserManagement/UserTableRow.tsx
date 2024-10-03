import React from "react";
import { User } from "./UserInterface";

interface UserTableRowProps {
  user: User; // Recibe un usuario de tipo 'User'
}

const UserTableRow: React.FC<UserTableRowProps> = ({ user }) => {
  return (
    <tr className="border-t">
      <td className="p-4">{user.name}</td>
      <td className="p-4">{user.username}</td>
      <td className="p-4">{user.role}</td>
      <td className="p-4">
        <span
          className={`font-bold ${
            user.status === "activo" ? "text-green-500" : "text-orange-500"
          }`}
        >
          {user.status}
        </span>
      </td>
      <td className="p-4">
        <button className="text-gray-500 hover:text-gray-700">
          <span role="img" aria-label="edit">
            ✏️
          </span>
        </button>
      </td>
    </tr>
  );
};

export default UserTableRow;
