import React from 'react';

export const MenuManagement: React.FC = () => {
  return (
    <div className="bg-blue-100 p-4 rounded">
      <h2 className="text-xl font-bold">Gestión de Menú</h2>
      <ul className="mt-2">
        <li>Comida</li>
        <li>Bebida</li>
        <li>Desayunos</li>
      </ul>
    </div>
  );
};
