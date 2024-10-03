import React from "react";
import { OrderItem } from "../../- subComponents/Card/CardInterface";
import NextOrderCard from "./NextOrderCard";

interface NextOrderProps {
  tableNumber: number;
  items: OrderItem[];
}

const timeSince = (date: Date) => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 60);

  if (interval > 1) {
    return `${interval} minutos`;
  }
  return "hace un momento";
};

const orderTime = new Date(Date.now() - 11 * 60000); // Hace 11 minutos
const timeSinceOrder = timeSince(orderTime); // Convertirlo a string

const NextOrder: React.FC<NextOrderProps> = ({ tableNumber, items }) => {
  return (
    <div>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4 text-left text-green-dark">
          Siguiente
        </h1>

        {/* <NextOrder tableNumber={5} /> */}
      </div>
      <NextOrderCard
        tableNumber={5}
        previewItems={[
          { name: "Pasta Peperoni", quantity: 1 },
          { name: "Pan Pizza Peperoni", quantity: 3 },
          { name: "Pizza Margarita", quantity: 2 },
          { name: "Crepa Salada de Jamon", quantity: 1 },
          { name: "Nachos con queso, especiales de la casa", quantity: 4 },
        ]}
        orderTime={orderTime} // Pasar el objeto Date directamente
      />
    </div>
  );
};

export default NextOrder;
