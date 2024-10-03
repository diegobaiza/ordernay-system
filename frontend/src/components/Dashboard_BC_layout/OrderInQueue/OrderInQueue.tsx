import React from "react";
import OrderInQueueCard from "./OrderInQueueCard";

interface OrderQueueProps {
  tableNumber: number;
  dish: string;
  timeElapsed: string;
}

interface OrdersQueueProps {
  orders: OrderQueueProps[];
}

const OrdersQueue: React.FC<OrdersQueueProps> = ({ orders }) => {
  return (
    <div className="p-4 w-full">
      <div className="space-y-6">
        <h2 className="text-2xl font-boldS text-left  text-green-dark">
          En cola...
        </h2>
        {/* Mapeamos la lista de órdenes y renderizamos una tarjeta por cada una */}
        {orders.map((order, index) => (
          <OrderInQueueCard
            key={index}
            tableNumber={order.tableNumber}
            dish={order.dish}
            timeElapsed={order.timeElapsed}
          />
        ))}
      </div>
    </div>
  );
};

export default OrdersQueue;
