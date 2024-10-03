import SubCategory from "./subCategory.model";

export const initializeSubCategories = async () => {
  const subCategories = [
    { categoryID: 1, name: "Baguettes" },
    { categoryID: 1, name: "Pastas" },
    { categoryID: 1, name: "Ensalada/Wrap" },
    { categoryID: 1, name: "Pan Pizza" },
    { categoryID: 1, name: "Pitzza Personal" },
    { categoryID: 1, name: "Crepas Saladas" },
    { categoryID: 1, name: "Extras" },
    { categoryID: 1, name: "Postres" },
    { categoryID: 1, name: "Crepas Dulces" },
    { categoryID: 2, name: "Calientes" },
    { categoryID: 2, name: "Frias" },
    { categoryID: 2, name: "Smothies" },
    { categoryID: 2, name: "Otras Bebidas" },
    { categoryID: 3, name: "Huevos al Gusto" },
    { categoryID: 3, name: "Baguette Omelette" },
    { categoryID: 3, name: "Omelette" },
    { categoryID: 3, name: "Yogurt" },
    { categoryID: 3, name: "Waffles" },
    { categoryID: 3, name: "Extrasv" },
  ];
  for (const subCategory of subCategories) {
    await SubCategory.findOrCreate({
      where: { name: subCategory.name },
      defaults: subCategory,
    });
  }
};
