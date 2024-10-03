// src/routes/category.routes.ts
import { Router } from 'express';
import { CategoryController } from '../../controllers/Category/category.controller';

const categoryRouter = Router();

// Define las rutas para la categoría
categoryRouter.get('/', CategoryController.getCategories);
categoryRouter.post('/', CategoryController.createCategory);
categoryRouter.get('/:id', CategoryController.getCategory);
categoryRouter.put('/:id', CategoryController.updateCategory);
categoryRouter.delete('/:id', CategoryController.deleteCategory);

export default categoryRouter;
