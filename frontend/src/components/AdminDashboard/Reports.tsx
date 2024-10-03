import React from 'react';

export const Reports: React.FC = () => {
  return (
    <div className="bg-blue-100 p-4 rounded">
      <h2 className="text-xl font-bold">Reportería</h2>
      <div className="flex space-x-4 mt-2">
        <div className="flex flex-col items-center">
          <span className="text-2xl">📄</span>
          <span>Día</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl">📄</span>
          <span>Mes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl">📄</span>
          <span>Año</span>
        </div>
      </div>
    </div>
  );
};
