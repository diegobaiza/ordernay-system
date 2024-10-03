// src/routes/order.routes.ts
import { Router } from "express";
import { orderController } from "../../controllers/Order/order.controller";

const orderRouter = Router();

orderRouter.post("/", orderController.createOrder);
orderRouter.get("/:id", orderController.getOrder);
orderRouter.put("/:id", orderController.updateOrder);
orderRouter.delete("/:id", orderController.deleteOrder);

export default orderRouter;
