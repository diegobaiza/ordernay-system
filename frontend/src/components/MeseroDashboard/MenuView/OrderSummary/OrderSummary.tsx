import React, { useState } from "react";

export interface OrderSummaryProps {
  orderItems: {
    name: string;
    quantity: number;
    price: number;
  }[];
  tableNumber: number;
  onRemoveItem: (name: string) => void;
  onSendOrder: () => Promise<void>; // Añadimos prop para manejar el envío
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderItems,
  tableNumber,
  onRemoveItem,
  onSendOrder,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const total = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-3/6 bg-blue-200 p-3 transition-all duration-300 rounded-t-lg ${
        isExpanded ? "h-3/6" : "h-16"
      }`}
    >
      <div
        className="flex justify-between items-center cursor-pointer px-3"
        onClick={toggleExpand}
      >
        <span className="font-bold"> {isExpanded ? `` : `pedido...`}</span>
        <span
          className={`transform transition-transform duration-1000  ${
            isExpanded ? "rotate-360" : "rotate-180"
          }`}
        >
          &#9660;
        </span>
      </div>
      {isExpanded && (
        <div>
          <div className="text-center font-bold mb-2">Resumen del Pedido</div>
          <div className="text-center mb-4 font-semibold">
            Mesa {tableNumber}
          </div>

          {/* Verificación si hay productos seleccionados */}
          {orderItems.length === 0 ? (
            <div className="pt-24 text-center font-style: italic font-bold text-gray-500">
              "Sin elementos"
            </div>
          ) : (
            <>
              <div className="mt-2 flex flex-col items-center space-y-2 overflow-y-auto h-52">
                {orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 rounded-md flex justify-between w-full"
                  >
                    <span>{item.name}</span>
                    <div className="flex space-x-4">
                      <span>{item.quantity}</span>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => onRemoveItem(item.name)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total y botones de acción */}
              <div className="flex justify-evenly mt-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                  Cancelar
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={onSendOrder} // Llamamos a la función para enviar la orden
                >
                  Enviar
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
