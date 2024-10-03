import React from "react";
import SwitchProductType from "../SwitchProductType/SwitchProductType"; // Agregamos el SwitchProductType

interface ProductGridProps {
  products: { id: string; name: string; price: number; description: string }[];
  onAddToOrder: (product: {
    id: string;
    name: string;
    price: number;
    description: string;
  }) => void;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  currentType: string; // Agregamos currentType
  setType: React.Dispatch<React.SetStateAction<string>>; // Agregamos setType
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToOrder,
  currentType, // Se utiliza currentType
  setType, // Se utiliza setType
}) => {
  return (
    <div className="relative flex justify-between w-full max-w-screen-lg mx-auto">
      {/* Grid de productos en el centro */}
      <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="h-24 flex items-center justify-center rounded-md bg-gray-200 text-center p-4 cursor-pointer hover:bg-gray-300 transition-all"
            onClick={() => onAddToOrder(product)}
          >
            <span className="truncate">{product.name}</span>
          </div>
        ))}
      </div>

      {/* SwitchProductType a la derecha */}
      <div className="flex-none fixed right-4 top-1/3">
        <SwitchProductType currentType={currentType} setType={setType} />
      </div>
    </div>
  );
};

export default ProductGrid;
