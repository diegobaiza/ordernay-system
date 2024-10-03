import sequelize from "./database";

// Sincroniza la base de datos
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });
