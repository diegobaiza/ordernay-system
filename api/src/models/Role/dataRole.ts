import Role from "./role.model";

export const initializeRoles = async () => {
  const roles = [
    { name: "administrador", description: "Administrador del sistema" },
    { name: "mesero", description: "Mesero del restaurante" },
    { name: "cocinero", description: "Cocinero del restaurante" },
    { name: "bartender", description: "Bartender del restaurante" },
    // Añade más roles según sea necesario
  ];

  // Crear roles si no existen
  for (const role of roles) {
    await Role.findOrCreate({
      where: { name: role.name },
      defaults: role,
    });
  }
};
