// src/routes/product.routes.ts
import { Router } from "express";
import { ProductController } from "../../controllers/Product/product.controller";

const productRouter = Router();

productRouter.get("/", ProductController.getProducts);
productRouter.post("/", ProductController.createProduct);
productRouter.get("/:id", ProductController.getProduct);
productRouter.put("/:id", ProductController.updateProduct);
productRouter.delete("/:id", ProductController.deleteProduct);
productRouter.get(
  "/subcategory/:subCategoryId",
  ProductController.getProductsBySubCategory
);

export default productRouter;
