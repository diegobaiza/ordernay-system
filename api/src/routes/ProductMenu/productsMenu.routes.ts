import { Router } from "express";
import {
  getAllProductsMenu,
  getProductMenuById,
  createProductMenu,
  updateProductMenu,
  deleteProductMenu,
} from "../../controllers/ProductMenu/productsMenu.controller";

const router = Router();

router.get("/", getAllProductsMenu);
router.get("/:id", getProductMenuById);
router.post("/", createProductMenu);
router.put("/:id", updateProductMenu);
router.delete("/:id", deleteProductMenu);

export default router;
