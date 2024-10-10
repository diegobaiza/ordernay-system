import React from "react";
import CardActions from "../../- subComponents/Card/CardActions/CardActions";

export interface OrderItem {
  name: string;
  quantity: number;
}

interface OrderInProgressProps {
  tableNumber: number;
  items: OrderItem[];
}

const OrderInProgress: React.FC<OrderInProgressProps> = ({
  tableNumber,
  items,
}) => {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleComplete = () => {
    alert("Pedido completado.");
  };

  const handleCancel = () => {
    alert("Pedido cancelado.");
  };

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
            {items.length === 0 ? (
              <p>No hay productos en el pedido actual</p>
            ) : (
              items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-center mb-4 pb-2"
                >
                  {" "}
                  <span className="text-xl font-semibold text-green-dark">
                    {item.quantity}
                  </span>
                  <span className="text-xl text-green-dark">{item.name}</span>
                  <h2></h2>
                </div>
              ))
            )}
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

export default OrderInProgress;
