import React, { useState } from "react";

interface PopoverProps {
  onDelete: () => void;
  onCancel: () => void;
}

const Popover: React.FC<PopoverProps> = ({ onDelete, onCancel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button onClick={togglePopover} className="text-xl">
        &#x22EE;
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50"
          style={{ top: "100%", right: 0 }} // Ajusta la posición si es necesario
        >
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
          >
            Eliminar
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => {
              onCancel();
              setIsOpen(false);
            }}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default Popover;
