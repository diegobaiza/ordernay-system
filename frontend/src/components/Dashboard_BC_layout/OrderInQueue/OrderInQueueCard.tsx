import React from "react";

interface OrderInQueueCardProps {
  tableNumber: number;
  previewItems: { name: string; quantity: number }[];
  orderTime: Date | undefined; // Allow undefined in case orderTime is not provided
}

const OrderInQueueCard: React.FC<OrderInQueueCardProps> = ({
  tableNumber,
  previewItems,
  orderTime,
}) => {
  // Handle undefined orderTime gracefully
  const timeAgo = orderTime
    ? Math.floor((Date.now() - new Date(orderTime).getTime()) / 60000)
    : "N/A"; // Return 'N/A' or any fallback value if orderTime is not available

  return (
    <div className="relative max-w-md mx-auto bg-green-palid shadow-md rounded-lg overflow-hidden p-3 cursor-pointer">
      {/* Información de la mesa, preview y hora */}
      <div className="flex justify-between items-center">
        <span className="text-white p-1.5 border-solid rounded-xl text-lg font-bold bg-green-forest">
          Mesa: {tableNumber}
        </span>
        <span className="flex-1 text-center mx-2 text-white border-solid rounded-xl p-2 bg-green-forest">
          {previewItems.map((item, index) => (
            <span key={index}>
              {item.name}
              {index < previewItems.length - 1 && ", "}
            </span>
          ))}
        </span>
        <span className="text-sm text-white bg-orange-sunset border-solid rounded-xl py-2 px-0.5">
          {timeAgo} min
        </span>
      </div>
    </div>
  );
};
export default OrderInQueueCard;
