// src/routes/productdetail.routes.ts
import { Router } from "express";
import { ProductDetailController } from "../../controllers/ProductDetail/productDetail.controller";

const productDetailRouter = Router();

// Define las rutas para el detalle del producto
productDetailRouter.get("/", ProductDetailController.getProductDetails);
productDetailRouter.post("/", ProductDetailController.createProductDetail);
productDetailRouter.get("/:id", ProductDetailController.getProductDetail);
productDetailRouter.put("/:id", ProductDetailController.updateProductDetail);
productDetailRouter.delete("/:id", ProductDetailController.deleteProductDetail);

export default productDetailRouter;
