import React from "react";
import Card from "../- subComponents/Card/Card";
import { OrderItem } from "../- subComponents/Card/CardInterface";
import CardActions from "../- subComponents/Card/CardActions/CardActions";
import NextOrderCard from "../- subComponents/Card/NextOrderCard/NextOrderCard";
import OrderQueueCard from "../- subComponents/Card/OrderQueueCard/OrderQueueCard";

const CocineroDashboard: React.FC = () => {
  const orderItems: OrderItem[] = [
    { name: "Baguette Filadelfia Steak", quantity: 1 },
    { name: "Pan Pizza, Hawaiano", quantity: 2 },
    { name: "Crepa, quesos y jamón", quantity: 1 },
  ];

  const handleComplete = () => {
    alert("Pedido completado.");
  };

  const handleCancel = () => {
    alert("Pedido cancelado.");
  };

  const orderTime = new Date(Date.now() - 11 * 60000); // Hace 11 minutos

  // Ejemplo de pedidos en cola
  const ordersInQueue = [
    { tableNumber: 3, dish: "Pizza Margarita", timeElapsed: "Hace 7min" },
    { tableNumber: 7, dish: "Baguette de Atún", timeElapsed: "Hace 5min" },
    { tableNumber: 8, dish: "Pasta Camarón", timeElapsed: "Hace 3min" },
    { tableNumber: 4, dish: "Crepa de queso", timeElapsed: "Hace 0min" },
  ];

  return (
    <div className="container p-4 flex flex-col mx-auto justify-center items-center h-full w-full border-solid border-gray-950">
      <section className="p-4 flex flex-col space-y-6 w-full md:max-w-screen-lg">
        {/* Pedido en curso */}
        <div className="flex flex-row justify-center space-x-6">
          <div className="flex-auto">
            <Card tableNumber={7} items={orderItems} />
          </div>

          {/* Órdenes en cola */}
          <div className="p-2 w-2/6 flex-auto">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold mb-4 text-left text-green-dark">
                En cola...
              </h2>
              {ordersInQueue.map((order, index) => (
                <OrderQueueCard
                  key={index}
                  tableNumber={order.tableNumber}
                  dish={order.dish}
                  timeElapsed={order.timeElapsed}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Siguiente pedido */}
        {/* Si decides habilitar el siguiente pedido */}
        {/* <div className="flex-auto">
    <h2 className="text-2xl font-semibold mb-4">Siguiente</h2>
    <NextOrderCard
      tableNumber={1}
      previewItems={[{ name: "Pasta Peperoni", quantity: 1 }]}
      orderTime={new Date(Date.now() - 10 * 60000)}
    />
  </div> */}
      </section>
    </div>
  );
};

export default CocineroDashboard;
