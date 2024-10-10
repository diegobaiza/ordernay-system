import app from "./app";
import sequelize from "./config/database";
import { createServer } from "http";
import { Server } from "socket.io";
import * as dotenv from "dotenv";

import { initializeUsers } from "./models/User/dataUser";
import { initializatePresentation } from "./models/Presentation/dataPresentation";
import { initializatePrices } from "./models/Price/dataPrice";
import { initializeProducts } from "./models/Product/dataProducts";
import { initializeCategories } from "./models/Category/dataCategory";
import { initializeRoles } from "./models/Role/dataRole";
import { initializeTables } from "./models/Table/dataTable";
import { initializeSubCategories } from "./models/SubCategory/dataSubCategory";

dotenv.config();

const port = process.env.PORT || 3300;

// Crear el servidor HTTP
const server = createServer(app);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
    return sequelize.sync();
  })
  .then(async () => {
    console.log("Database & tables created!");
    await initializeRoles();
    await initializeTables();
    await initializeCategories();
    await initializeSubCategories();
    await initializeProducts();
    // await initializatePresentation();
    // await initializatePrices();
    // await initializeUsers();

    // Cambiamos app.listen a server.listen para manejar el servidor HTTP y Socket.IO
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(
      "Error creating database tables or connecting to database:",
      error
    );
  });
