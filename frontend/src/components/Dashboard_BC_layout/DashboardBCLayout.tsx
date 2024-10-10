import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderInProgress from "./OrderInProgress/OrderInProgress";
import NextOrder from "./NextOrder/NextOrder";
import OrdersQueue from "./OrderInQueue/OrderInQueue";
import { useAuth } from "../../context/AuthContext/AuthContext";

// DashboardBCLayout.tsx

const DashboardBCLayout: React.FC = () => {
  const { role } = useAuth(); // Obtener el rol del usuario (cocinero o bartender)
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [nextOrder, setNextOrder] = useState<any>(null);
  const [ordersInQueue, setOrdersInQueue] = useState<any[]>([]);

  // Función para obtener las órdenes desde el servidor
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3300/api/dashboard/${role}`
      );
      console.log("Datos recibidos:", response.data);

      if (role === "cocinero") {
        const cocineroOrders = response.data.cocineroOrders || {};
        const { currentOrder, nextOrder, ordersInQueue } = cocineroOrders;
        setCurrentOrder(currentOrder || null);
        setNextOrder(nextOrder || null);
        setOrdersInQueue(ordersInQueue || []);
      } else if (role === "bartender") {
        const bartenderOrders = response.data.bartenderOrders || {};
        console.log(bartenderOrders);

        const { currentOrder, nextOrder, ordersInQueue } = bartenderOrders;
        setCurrentOrder(currentOrder || null);
        setNextOrder(nextOrder || null);
        setOrdersInQueue(ordersInQueue || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Polling cada 5 segundos para actualizar las órdenes
  useEffect(() => {
    const interval = setInterval(fetchOrders, 5000); // Polling cada 5 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [role]); // Actualiza cuando cambie el rol del usuario

  return (
    <div className="flex flex-col lg:flex-row justify-between space-x-0 lg:space-x-6 p-2">
      {/* Columna izquierda: Pedido en curso y pedido siguiente */}
      <div className="flex-1 basis-5/12 space-y-6 p-4 rounded-md">
        {currentOrder ? (
          <OrderInProgress
            tableNumber={currentOrder.tableNumber}
            items={currentOrder.items}
          />
        ) : (
          <div className="text-center text-gray-500">
            No hay pedido en curso.
          </div>
        )}

        {nextOrder ? (
          <NextOrder
            tableNumber={nextOrder.tableNumber}
            items={nextOrder.items}
          />
        ) : (
          <div className="text-center text-gray-500">
            No hay pedido siguiente.
          </div>
        )}
      </div>

      {/* Columna derecha: Pedidos en cola */}
      <div className="flex-1 basis-1/2 p-2 rounded-md">
        {ordersInQueue.length > 0 ? (
          <OrdersQueue orders={ordersInQueue} />
        ) : (
          <div className="text-center text-gray-500">
            No hay pedidos en cola.
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardBCLayout;
