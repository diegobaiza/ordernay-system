import express from "express";
import { authController } from "../../controllers/Auth/auth.controller";

const authRoutes = express.Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.get("/veryfy-token", authController.verifyToken);

export default authRoutes;
