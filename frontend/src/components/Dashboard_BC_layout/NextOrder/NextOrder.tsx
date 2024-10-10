import React from "react";
import { OrderItem } from "../OrderInProgress/OrderInProgress";
// import { OrderItem } from "../../- subComponents/Card/CardInterface";
import NextOrderCard from "./NextOrderCard";

interface NextOrderProps {
  tableNumber: number;
  items: OrderItem[];
}

const NextOrder: React.FC<NextOrderProps> = ({ tableNumber, items }) => {
  return (
    <div>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4 text-left text-green-dark">
          Siguiente Pedido
        </h1>
        {items.length === 0 ? (
          <p>No hay un siguiente pedido.</p>
        ) : (
          <NextOrderCard
            tableNumber={tableNumber}
            previewItems={items}
            orderTime={new Date()} // Aquí puedes ajustar para usar el tiempo correcto
          />
        )}
      </div>
    </div>
  );
};

export default NextOrder;
