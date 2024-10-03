import React from "react";
import OrderQueue from "../../../AdminDashboard/OrderQueue/OrderQueue";

interface OrderQueueCardProps {
  tableNumber: number;
  dish: string;
  timeElapsed: string;
}

const OrderQueueCard: React.FC<OrderQueueCardProps> = ({
  tableNumber,
  dish,
  timeElapsed,
}) => {
  const ordersInQueue = [
    { tableNumber: 1, dish: "Pizza Margarita", timeElapsed: "Hace 7min" },
    { tableNumber: 7, dish: "Baguette de Atún", timeElapsed: "Hace 5min" },
    { tableNumber: 8, dish: "Pasta Camarón", timeElapsed: "Hace 3min" },
    { tableNumber: 4, dish: "Crepa de queso", timeElapsed: "Hace 0min" },
  ];

  return (
    <div className="p-2 w-2/6 flex-auto">
      {/* <div className="space-y-3">
        <h2 className="text-2xl font-bold mb-4 text-left text-green-dark">
          En cola...
        </h2>
        {ordersInQueue.map((order, index) => (
          <OrderQueue
            key={index}
            tableNumber={order.tableNumber}
            dish={order.dish}
            timeElapsed={order.timeElapsed}
          />
        ))}
      </div> */}
    </div>
  );
};

export default OrderQueueCard;
