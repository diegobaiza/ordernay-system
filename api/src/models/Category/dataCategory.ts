import Category from "./category.model";

export const initializeCategories = async () => {
  const categories = [
    { name: "Comidas", description: "Categoria para listar las comidas" },
    { name: "Bebidas", description: "Categoria para listar las bebidas" },
    { name: "Desayunos", description: "Categoria para listar los desayunos" },
  ];

  for (const category of categories) {
    await Category.findOrCreate({
      where: { name: category.name },
      defaults: category,
    });
    // console.log(`Category ${cat.name} ${created ? "created" : "found"}`);
  }
};
