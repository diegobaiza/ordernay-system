import { Router } from "express";
import { PresentationController } from "../../controllers/Presentation/presentation.controller";

const presentationRouter = Router();

// Define las rutas para el precio
presentationRouter.get("/", PresentationController.getPresentations);
presentationRouter.post("/", PresentationController.createPresentation);
presentationRouter.get("/:id", PresentationController.getPresentation);
presentationRouter.put("/:id", PresentationController.updatePresentation);
presentationRouter.delete("/:id", PresentationController.deletePresentation);

export default presentationRouter;
