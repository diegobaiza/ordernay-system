import { Router } from "express";
import { SubCategoryController } from "../../controllers/SubCategory/subCategory.controller";

const subCategoryRouter = Router();

subCategoryRouter.get("/", SubCategoryController.getSubCategories);
subCategoryRouter.post("/", SubCategoryController.createSubCategory);
subCategoryRouter.get("/:id", SubCategoryController.getSubCategory);
subCategoryRouter.put("/:id", SubCategoryController.updateSubCategory);
subCategoryRouter.delete("/:id", SubCategoryController.deleteSubCategory);
subCategoryRouter.get(
  "/category/:categoryId",
  SubCategoryController.getSubCategoriesByCategory
);

export default subCategoryRouter;
