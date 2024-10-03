import { Router } from "express";
import { PriceController } from "../../controllers/Price/price.controller";

const priceRouter = Router();

// Define las rutas para el precio
priceRouter.get("/", PriceController.getPrices);
priceRouter.post("/", PriceController.createPrice);
priceRouter.get("/:id", PriceController.getPrice);
priceRouter.put("/:id", PriceController.updatePrice);
priceRouter.delete("/:id", PriceController.deletePrice);

export default priceRouter;
