import React, { useState } from "react";
import Modal from "./Modal";
import Popover from "./Popover";

interface NextOrderCardProps {
  tableNumber: number;
  previewItems: { name: string; quantity: number }[];
  orderTime: Date;
}

const NextOrderCard: React.FC<NextOrderCardProps> = ({
  tableNumber,
  previewItems,
  orderTime,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation(); // Evita que el menú se cierre al hacer clic dentro de él
    setShowMenu(!showMenu);
  };

  const handleClose = () => {
    setShowMenu(false);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    alert("Orden eliminada");
  };

  const handleCancel = () => {
    alert("Orden cancelada");
  };

  const timeAgo = Math.floor((Date.now() - orderTime.getTime()) / 60000); // En minutos

  var preview = previewItems.slice(0, 2);
  console.log(preview);
  const remainingItems = previewItems.length - preview.length;
  console.log(remainingItems);

  return (
    <div className="relative max-w-md mx-auto bg-green-palid shadow-md rounded-lg overflow-hidden p-3 cursor-pointer">
      {/* Información de la mesa, preview y hora */}
      <div
        className="flex justify-between items-center"
        onClick={handleOpenModal}
      >
        <span className="text-white p-1.5 border-solid rounded-xl text-lg font-bold bg-green-forest">
          Mesa: {tableNumber}
        </span>
        <span className="flex-1 text-center mx-2 text-white border-solid rounded-xl p-2 bg-green-forest">
          {preview.map((item, index) => (
            <span key={index}>
              {item.name}
              {index < preview.length - 1 && ", "}
            </span>
          ))}
          {remainingItems > 0 && `... +${remainingItems}`}
        </span>
        <span className="text-sm text-white bg-orange-sunset border-solid rounded-xl py-2 px-0.5">
          {timeAgo} min
        </span>
        <span
          className="text-xl cursor-pointer ml-3"
          onClick={(e) => e.stopPropagation}
        >
          <Popover onDelete={handleDelete} onCancel={handleCancel} />
        </span>
      </div>

      {/* Modal para detalles completos de la orden */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-2xl font-bold mb-4">Detalles de la Orden</h2>
        {previewItems.map((item, index) => (
          <p key={index}>
            {item.quantity} x {item.name}
          </p>
        ))}
      </Modal>

      {/* Cerrar globos de texto si hay alguno abierto */}
      {(isModalOpen || showMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={handleClose} // Cerrar ambos globos al hacer clic fuera de ellos
        ></div>
      )}
    </div>
  );
};

export default NextOrderCard;
