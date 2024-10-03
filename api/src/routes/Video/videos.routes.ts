import { Router } from "express";
import * as videoController from "./videos.controller";

const router = Router();

// Obtener todos los videos
router.get('/videos', videoController.getVideos)

// Subir un Video
router.post('/videos', videoController.createVideo)

// Obtener un Video
router.get('/videos/:id', videoController.getVideo)

// Eliminar un Video
router.delete('/videos/:id', videoController.deleteVideo)

// Actualizar un Video
router.put('/videos/:id', videoController.updateVideo)
 
export default router