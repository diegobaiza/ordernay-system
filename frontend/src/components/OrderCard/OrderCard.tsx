import React from "react";

// interface OrderCardProps {
//   tableNumber: number;
//   items: { name: string; quantity: number }[];
//   onComplete: () => void;
//   onCancel: () => void;
// }

export const OrderCard: React.FC = () => {
  return (
    <div className="order-card">
      <h3>Mesa 1</h3>
      <div className="order-actions">
        <button className="complete-button">Completado</button>
        <button className="cancel-button">Cancelar</button>
      </div>
    </div>
  );
};
