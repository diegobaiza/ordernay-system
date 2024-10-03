import { Router } from "express";
import { TableController } from "../../controllers/Table/tableSite.controller";

const tableRouter = Router();

// Define las rutas para la mesa
tableRouter.get("/", TableController.getTables);
tableRouter.post("/", TableController.createTable);
tableRouter.get("/:id", TableController.getTable);
tableRouter.put("/:id", TableController.updateTable);
tableRouter.delete("/:id", TableController.deleteTable);
tableRouter.get("/user/:usernameID", TableController.getTableByUserID);

export default tableRouter;
