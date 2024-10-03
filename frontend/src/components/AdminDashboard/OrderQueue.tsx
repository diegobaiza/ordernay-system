import React from 'react';

export const OrderQueue: React.FC = () => {
  return (
    <div className="bg-blue-100 p-4 rounded">
      <h2 className="text-xl font-bold">Órdenes en cola</h2>
      <ul className="space-y-2 mt-2">
        <li>Mesa 5</li>
        <li>Mesa 7</li>
      </ul>
    </div>
  );
};
