import React from "react";
import UserTableRow from "../UserTableRow";
import { User } from "../UserInterface";

interface UserTableProps {
  users: User[]; // Un array de objetos de tipo 'User'
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr className="bg-gray-200 text-left text-xl">
          <th className="p-4">Nombre</th>
          <th className="p-4">Usuario</th>
          <th className="p-4">Rol</th>
          <th className="p-4">Estado</th>
          <th className="p-4">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <UserTableRow key={index} user={user} />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
