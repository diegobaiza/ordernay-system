interface CardActionsProps {
  onComplete: () => void;
  onCancel: () => void;
}

const CardActions: React.FC<CardActionsProps> = ({ onComplete, onCancel }) => {
  return (
    <div className="flex justify-evenly mt-4">
      <button
        onClick={onComplete}
        className="w-1/3 bg-green-forest text-white px-6 py-3 rounded hover:bg-green-600 transition duration-300"
      >
        Completado
      </button>
      <button
        onClick={onCancel}
        className="w-1/3 bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition duration-300"
      >
        Cancelar
      </button>
    </div>
  );
};

export default CardActions;
