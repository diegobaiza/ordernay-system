import React, { useState } from "react";

export interface OrderSummaryProps {
  orderItems: {
    productID: string;
    name: string;
    quantity: number;
    // price: number;
  }[];
  tableNumber: number;
  onRemoveItem: (productID: string) => void;
  onSendOrder: () => Promise<void>;
  onUpdateQuantity: (productID: string, quantity: number) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderItems,
  tableNumber,
  onRemoveItem,
  onSendOrder,
  onUpdateQuantity,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-black px-2 py-1 rounded"
                        onClick={() =>
                          item.quantity === 1
                            ? onRemoveItem(item.productID)
                            : onUpdateQuantity(
                                item.productID,
                                item.quantity - 1
                              )
                        }
                      >
                        {item.quantity === 1 ? "x" : "<"}
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        className="text-black px-2 py-1 rounded"
                        onClick={() =>
                          onUpdateQuantity(item.productID, item.quantity + 1)
                        }
                      >
                        {">"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-evenly mt-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                  Cancelar
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={onSendOrder}
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
