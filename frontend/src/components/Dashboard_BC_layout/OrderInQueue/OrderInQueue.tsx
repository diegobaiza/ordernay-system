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
        <h2 className="text-2xl font-bold text-left text-green-dark">
          En cola...
        </h2>
        {orders.length === 0 ? (
          <p>No hay pedidos en cola.</p>
        ) : (
          orders.map((order, index) => (
            <OrderInQueueCard
              key={index}
              tableNumber={order.tableNumber}
              dish={order.dish}
              timeElapsed={order.timeElapsed}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersQueue;
