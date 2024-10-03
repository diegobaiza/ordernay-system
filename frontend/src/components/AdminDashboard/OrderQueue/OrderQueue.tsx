import OrderCard from "./OrderQueueCard";

const OrderQueue = () => {
  const orders = [
    // Ejemplo de órdenes
    { id: 1, table: 5, details: "Pizza, Coca-cola" },
    { id: 2, table: 3, details: "Pasta, Agua" },
  ];

  return <div>Pagina de las ordenes en cola para el administrador </div>;
};

export default OrderQueue;
