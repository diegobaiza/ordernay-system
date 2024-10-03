import React from "react";

interface SwitchCategoryFoodProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const SwitchCategoryFood: React.FC<SwitchCategoryFoodProps> = ({
  category,
  setCategory,
}) => {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      <button
        className={`px-4 py-2 rounded-full ${
          category === "Comidas"
            ? "bg-blue-400 text-white"
            : "bg-gray-200 text-black"
        }`}
        onClick={() => setCategory("Comidas")}
      >
        Comidas
      </button>
      <button
        className={`px-4 py-2 rounded-full ${
          category === "Desayunos"
            ? "bg-orange-400 text-white"
            : "bg-gray-200 text-black"
        }`}
        onClick={() => setCategory("Desayunos")}
      >
        Desayunos
      </button>
      <button
        className={`px-4 py-2 rounded-full ${
          category === "Bebidas"
            ? "bg-green-400 text-white"
            : "bg-gray-200 text-black"
        }`}
        onClick={() => setCategory("Bebidas")}
      >
        Bebidas
      </button>
    </div>
  );
};

export default SwitchCategoryFood;
