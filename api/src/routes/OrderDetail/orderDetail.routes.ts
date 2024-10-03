// src/routes/orderDetail.routes.ts
import { Router } from "express";
import { orderDetailController } from "../../controllers/OrderDetail/orderDetail.controller";

const orderDetailrouter = Router();

orderDetailrouter.post("/", orderDetailController.createOrderDetail);
orderDetailrouter.get("/:id", orderDetailController.getOrderDetail);

export default orderDetailrouter;
