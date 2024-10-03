import React from "react";
import { SwitchProductTypeProps } from "./SwitchProductTypeInterface";

const SwitchProductType: React.FC<SwitchProductTypeProps> = ({
  currentType,
  setType,
}) => {
  return (
    <div className="pl-16 fixed top-1/2 transform -translate-y-1/2 flex flex-col space-y-10">
      <button
        className={`w-12 h-12 rounded-full ${
          currentType === "Comidas/Desayunos" ? "bg-cyan-300" : "bg-gray-200"
        }`}
        onClick={() => setType("Comidas/Desayunos")}
      >
        🍽️
      </button>
      <button
        className={`w-12 h-12 rounded-full ${
          currentType === "Bebidas" ? "bg-cyan-300" : "bg-gray-200"
        }`}
        onClick={() => {
          setType("Bebidas");
        }}
      >
        🥤
      </button>
    </div>
  );
};

export default SwitchProductType;
