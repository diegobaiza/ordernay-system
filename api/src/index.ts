import app from "./app";
import sequelize from "./config/database";
import * as dotenv from "dotenv";
import { initializeUsers } from "./models/User/dataUser";
import { initializeProducts } from "./models/Product/dataProducts";
import { initializeCategories } from "./models/Category/dataCategory";
import { initializeRoles } from "./models/Role/dataRole";
import { initializeTables } from "./models/Table/dataTable";
import { initializeSubCategories } from "./models/SubCategory/dataSubCategory";
import { initializatePresentation } from "./models/Presentation/dataPresentation";
import { initializatePrices } from "./models/Price/dataPrice";

// Importación para Socket.IO
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const port = process.env.PORT || 3300;

// Crear el servidor HTTP
const server = createServer(app);

// Configuración de Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Permitimos cualquier origen para desarrollo, pero se puede restringir en producción
    methods: ["GET", "POST"],
  },
});

// Manejo de conexiones de Socket.IO
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });

  // Aquí puedes agregar más eventos como para pedidos, actualizaciones, etc.
  socket.on("sendOrder", (order) => {
    console.log("Nuevo pedido recibido:", order);
    // Emitimos el pedido a los cocineros o bartenders según sea necesario
    if (order.type === "comida") {
      io.emit("newOrderForCook", order);
    } else if (order.type === "bebida") {
      io.emit("newOrderForBartender", order);
    }
  });
});

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
    await initializatePrices();
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
