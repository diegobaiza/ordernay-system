import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderInProgress from "./OrderInProgress/OrderInProgress";
import NextOrder from "./NextOrder/NextOrder";
import OrdersQueue from "./OrderInQueue/OrderInQueue";
import { useAuth } from "../../context/AuthContext/AuthContext";

const DashboardBCLayout: React.FC = () => {
  const { role } = useAuth(); // Obtener el rol del usuario
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [nextOrder, setNextOrder] = useState<any>(null);
  const [ordersInQueue, setOrdersInQueue] = useState<any[]>([]);

  // Fetch orders from backend based on role
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/api/dashboard/${role}` // Endpoint dinámico basado en el rol
        );
        const { currentOrder, nextOrder, ordersInQueue } = response.data;

        // Asegúrate de que los datos existen antes de asignarlos
        setCurrentOrder(currentOrder || null);
        setNextOrder(nextOrder || null);
        setOrdersInQueue(ordersInQueue || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [role]);

  return (
    <div className="flex flex-col lg:flex-row justify-between space-x-0 lg:space-x-6 p-2">
      {/* Columna izquierda */}
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

      {/* Columna derecha */}
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
