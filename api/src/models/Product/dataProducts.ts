import Product from "./product.model";

export const initializeProducts = async () => {
  const products = [
    //Comidas
    // Baguettes
    {
      name: "Jamon y Queso",
      subCategoryID: 1,
      description: "Baguette hecho con amor de jamon y queso",
      is_active: true,
    },
    {
      name: "Atun",
      subCategoryID: 1,
      description: "Baguette que esta chilero de atun",
      is_active: true,
    },

    // Pastas
    {
      name: "Margarita",
      subCategoryID: 2,
      description: "Pasta con tomate, albahaca, y salsa roja",
      is_active: true,
    },
    {
      name: "Jamon y Peperoni",
      subCategoryID: 2,
      description: "De jamon o peperoni, salsa roja o salsa blanca",
      is_active: true,
    },

    // Ensaladas / Wraps
    {
      name: "Ensalada Verde",
      subCategoryID: 3,
      description: "Ensalada clásica Verde con pollo a la parrilla",
      is_active: true,
    },
    {
      name: "Ensalada Aguacate",
      subCategoryID: 3,
      description: "Wrap de pollo con verduras frescas y aderezo ranch",
      is_active: true,
    },

    // Pan Pizza
    {
      name: "Margarita",
      subCategoryID: 4,
      description: "Pan pizza de margarita con queso mozzarella",
      is_active: true,
    },
    {
      name: "Peperoni",
      subCategoryID: 4,
      description: "Pan pizza de peperoni y salsa roja",
      is_active: true,
    },

    // Pitzza Personal
    {
      name: "Margarita",
      subCategoryID: 5,
      description: "Pitzza de Margarita",
      is_active: true,
    },
    {
      name: "5 Quesos",
      subCategoryID: 5,
      description: "Pitzza a base de 5 quesos",
      is_active: true,
    },

    // Crepas Saladas
    {
      name: "Quesos y Peperoni",
      subCategoryID: 6,
      description: "Crepa con queso y peperoni con salsa roja",
      is_active: true,
    },
    {
      name: "Quesos y Jamon",
      subCategoryID: 6,
      description: "Crepa de quesos y jamon con salsa roja",
      is_active: true,
    },

    // Extras
    {
      name: "Extra de Queso",
      subCategoryID: 7,
      description: "Porción extra de queso para acompañar tus platillos",
      is_active: true,
    },
    {
      name: "Extra de Guacamole",
      subCategoryID: 7,
      description: "Porción extra de guacamole fresco",
      is_active: true,
    },

    // Postres
    {
      name: "Pastel de la Casa",
      subCategoryID: 8,
      description: "Delicioso pastel de la casa",
      is_active: true,
    },
    {
      name: "Afogato",
      subCategoryID: 8,
      description: "Helado afogato",
      is_active: true,
    },

    // Crepas Dulces
    {
      name: "Dulce de Leche y Banano",
      subCategoryID: 9,
      description: "Crepa rellena de dulce de leche y banano",
      is_active: true,
    },
    {
      name: "Dulce de leche y Fresa",
      subCategoryID: 9,
      description: "Crepa rellena de dulce de leche y fresa",
      is_active: true,
    },

    // Bebidas
    // Bebidas Calientes
    {
      name: "Cafe con Leche",
      subCategoryID: 10,
      description: "Delicioso cafe con leche",
      is_active: true,
    },
    {
      name: "Americano",
      subCategoryID: 10,
      description: "Delicioso cafe americano, osease de america ps",
      is_active: true,
    },

    // Bebidas Frias
    {
      name: "Coffee",
      subCategoryID: 11,
      description: "Delicioso coffee",
      is_active: true,
    },
    {
      name: "Oreo",
      subCategoryID: 11,
      description: "Delicioso oreo",
      is_active: true,
    },

    // Smothies
    {
      name: "Fresa y Leche",
      subCategoryID: 12,
      description: "Delicioso smothie de fresa con leche",
      is_active: true,
    },
    {
      name: "Fresa y Naranja",
      subCategoryID: 12,
      description: "Delicioso smothie de fresa y naranja",
      is_active: true,
    },

    // Otras Bebidas
    {
      name: "Te frio",
      subCategoryID: 13,
      description: "Deliciosa bebida te frio",
      is_active: true,
    },
    {
      name: "Naranja con Agua",
      subCategoryID: 13,
      description: "Bebida de naranja con agua",
      is_active: true,
    },

    // Desayunos
    // Huevos al Gusto
    {
      name: "Revueltos",
      subCategoryID: 14,
      description: "Un par de huevos revueltos",
      is_active: true,
    },
    {
      name: "Estrellados",
      subCategoryID: 14,
      description: "Un par de huevos estrellados",
      is_active: true,
    },

    // Baguette Omelette
    {
      name: "Pan Baguette y Omelette",
      subCategoryID: 15,
      description: "Huevo y pan",
      is_active: true,
    },
    {
      name: "Pan Baguette y Omelette mas Chips",
      subCategoryID: 15,
      description: "Pan, huevo, y ricitos",
      is_active: true,
    },

    // Omelette
    {
      name: "Super Omelette",
      subCategoryID: 16,
      description: "superhuevo",
      is_active: true,
    },
    {
      name: "Super Omelette Tecpan",
      subCategoryID: 16,
      description: "huevo con chorizo quichilense",
      is_active: true,
    },

    // Yogurt
    {
      name: "Banana, Fresa, Miel y Granola",
      subCategoryID: 17,
      description: "Pan, huevo, y ricitos",
      is_active: true,
    },

    // Wafles
    {
      name: "2 Wafles con fresa",
      subCategoryID: 18,
      description: "Pan, huevo, y ricitos",
      is_active: true,
    },
    {
      name: "2 Wafles con Dulce de Leche, Nutella y Manjar",
      subCategoryID: 18,
      description: "panqueques cuadrados con miel",
      is_active: true,
    },

    // Extras
    {
      name: "Guacamole",
      subCategoryID: 19,
      description: "Delicioso aguacate",
      is_active: true,
    },
    {
      name: "Leche",
      subCategoryID: 19,
      description: "leche.",
      is_active: true,
    },
  ];

  for (const product of products) {
    await Product.findOrCreate({
      where: { name: product.name },
      defaults: product,
    });
  }
};
