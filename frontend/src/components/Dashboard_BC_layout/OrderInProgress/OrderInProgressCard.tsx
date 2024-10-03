import React from "react";
import CardActions from "./CardActions";
// import NextOrderCard from "./NextOrderCard/NextOrderCard";

interface OrderItem {
  name: string;
  quantity: number;
}

interface CardProps {
  tableNumber: number;
  items: OrderItem[];
}

// Función para calcular el tiempo transcurrido
const timeSince = (date: Date) => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 60);

  if (interval > 1) {
    return `${interval} minutos`;
  }
  return "hace un momento";
};

const Card: React.FC<CardProps> = ({ tableNumber, items }) => {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleComplete = () => {
    alert("Pedido completado.");
  };

  const handleCancel = () => {
    alert("Pedido cancelado.");
  };

  // Calcular el tiempo transcurrido desde hace 11 minutos
  const orderTime = new Date(Date.now() - 11 * 60000); // Hace 11 minutos
  const timeSinceOrder = timeSince(orderTime); // Convertirlo a string

  return (
    <div className="p-2 flex-col space-y-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-left text-green-dark">
          Pedido en Curso
        </h1>

        <div className="bg-green-palid shadow-md rounded-lg overflow-hidden">
          <div className="bg-green-palid text-black text-center py-3">
            <h2 className="text-2xl font-bold">Mesa {tableNumber}</h2>
          </div>
          <div className="p-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4 pb-2"
              >
                <span className="text-xl font-semibold text-green-dark">
                  {item.quantity}
                </span>
                <span className="text-xl text-green-dark">{item.name}</span>
                <span></span>
              </div>
            ))}
          </div>
          <div className="bg-green-palid px-4 py-2 text-right">
            <span className="font-semibold text-lg text-green-dark">
              Total de productos: {totalItems}
            </span>
          </div>
        </div>

        <CardActions onComplete={handleComplete} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default Card;
