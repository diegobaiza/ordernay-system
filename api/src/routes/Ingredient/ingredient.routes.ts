// src/routes/Ingredient/ingredient.routes.ts
import { Router } from "express";
import { ingredientController } from '../../controllers/Ingredient/ingredient.controller';

const ingredientRouter = Router();

ingredientRouter.get("/", ingredientController.getIngredients);
ingredientRouter.post("/", ingredientController.createIngredient);
ingredientRouter.get("/:id", ingredientController.getIngredient);
ingredientRouter.put("/:id", ingredientController.updateIngredient);
ingredientRouter.delete("/:id", ingredientController.deleteIngredient);

export default ingredientRouter;
