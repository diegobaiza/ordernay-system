import React from "react";
import OrderInProgress from "./OrderInProgress/OrderInProgress";
import NextOrder from "./NextOrder/NextOrder";
import OrdersQueue from "./OrderInQueue/OrderInQueue";
import { useAuth } from "../../context/AuthContext/AuthContext";

const DashboardBCLayout: React.FC = () => {
  const { role } = useAuth(); // Obtener el rol del usuario

  // Simulamos datos de ejemplo para ambos roles (cocinero y bartender)
  const data = {
    cocinero: {
      currentOrder: {
        tableNumber: 7,
        items: [
          { name: "Baguette Filadelfia Steak", quantity: 1 },
          { name: "Pan Pizza, Hawaiano", quantity: 2 },
          { name: "Crepa, quesos y jamón", quantity: 1 },
        ],
      },
      nextOrder: {
        tableNumber: 5,
        items: [{ name: "Pasta Peperoni", quantity: 2 }],
      },
      ordersInQueue: [
        { tableNumber: 3, dish: "Pizza Margarita", timeElapsed: "Hace 7min" },
        { tableNumber: 7, dish: "Baguette de Atún", timeElapsed: "Hace 5min" },
        { tableNumber: 8, dish: "Pasta Camarón", timeElapsed: "Hace 3min" },
        { tableNumber: 8, dish: "Pasta Camarón", timeElapsed: "Hace 3min" },
        { tableNumber: 8, dish: "Pasta Camarón", timeElapsed: "Hace 3min" },
      ],
    },
    bartender: {
      currentOrder: {
        tableNumber: 3,
        items: [
          { name: "Margarita", quantity: 2 },
          { name: "Piña Colada", quantity: 1 },
        ],
      },
      nextOrder: {
        tableNumber: 2,
        items: [{ name: "Cerveza Corona", quantity: 3 }],
      },
      ordersInQueue: [
        { tableNumber: 4, dish: "Mojito", timeElapsed: "Hace 2min" },
        { tableNumber: 5, dish: "Tequila Sunrise", timeElapsed: "Hace 4min" },
        { tableNumber: 5, dish: "Tequila Sunrise", timeElapsed: "Hace 4min" },
        { tableNumber: 5, dish: "Tequila Sunrise", timeElapsed: "Hace 4min" },
        { tableNumber: 5, dish: "Tequila Sunrise", timeElapsed: "Hace 4min" },
      ],
    },
  };

  // Decidimos qué datos usar en función del rol
  const currentData = role === "cocinero" ? data.cocinero : data.bartender;

  return (
    <div className="flex flex-col lg:flex-row justify-between space-x-0 lg:space-x-6 p-2">
      {/* Columna izquierda */}
      <div className="flex-1 basis-5/12 space-y-6 p-4 rounded-md">
        <OrderInProgress
          tableNumber={currentData.currentOrder.tableNumber}
          items={currentData.currentOrder.items}
        />
        <NextOrder
          tableNumber={currentData.nextOrder.tableNumber}
          items={currentData.nextOrder.items}
        />
      </div>

      {/* Columna derecha */}
      <div className="flex-1 basis-1/2 p-2 rounded-md">
        <OrdersQueue orders={currentData.ordersInQueue} />
      </div>
    </div>
  );
};

export default DashboardBCLayout;
