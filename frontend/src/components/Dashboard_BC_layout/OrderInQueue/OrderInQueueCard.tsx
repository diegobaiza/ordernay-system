import React from "react";

interface OrderInQueueCardProps {
  tableNumber: number;
  dish: string;
  timeElapsed: string;
}

const OrderInQueueCard: React.FC<OrderInQueueCardProps> = ({
  tableNumber,
  dish,
  timeElapsed,
}) => {
  return (
    <div className="mx-auto bg-green-palid shadow-md rounded-lg overflow-hidden p-5 cursor-pointer flex justify-around items-center">
      {/* Número de mesa */}
      <span className="text-white p-1.5 border-solid rounded-xl text-lg font-bold bg-green-forest">
        Mesa: {tableNumber}
      </span>

      {/* Plato en cola */}
      <span className="flex-1 text-center mx-2 text-white border-solid rounded-xl p-2 bg-green-forest">
        {dish}
      </span>

      {/* Tiempo transcurrido */}
      <span className="text-sm text-white bg-orange-sunset border-solid rounded-xl py-2 px-0.5">
        {timeElapsed}
      </span>
    </div>
  );
};

export default OrderInQueueCard;
