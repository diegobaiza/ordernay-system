import React from "react";
import OrderInQueueCard from "./OrderInQueueCard";
import { OrderItem } from "../OrderInProgress/OrderInProgress";
// import { OrderItem } from "../../- subComponents/Card/CardInterface";

interface OrdersQueueProps {
  // tableNumber: number;
  items: OrderItem[];
  orderTime: Date;
}

const OrdersQueue: React.FC<OrdersQueueProps> = ({
  // tableNumber,
  orderTime,
  items,
}) => {
  console.log(items);
  return (
    <div className="p-4 w-full">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-left text-green-dark">
          En cola...
        </h2>
        {items.length === 0 ? (
          <p>No hay pedidos en cola.</p>
        ) : (
          items.map((item, index) => (
            <OrderInQueueCard
              key={index}
              tableNumber={item.tableNumber}
              previewItems={item.items}
              orderTime={orderTime}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersQueue;
