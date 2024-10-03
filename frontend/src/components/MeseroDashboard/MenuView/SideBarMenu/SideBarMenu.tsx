import React from "react";

interface SidebarMenuProps {
  subCategories: { id: string; name: string }[];
  setSelectedSubCategory: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  subCategories,
  setSelectedSubCategory,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-start h-96 bg-gray-100 p-4 overflow-y-auto rounded-lg shadow-md"
      style={{ marginLeft: "2rem" }} // Despegado de la izquierda y centrado verticalmente
    >
      <ul className="space-y-1">
        {subCategories.map((subCategory) => (
          <li
            key={subCategory.id}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded"
            onClick={() => setSelectedSubCategory(subCategory.id)}
          >
            {subCategory.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;
