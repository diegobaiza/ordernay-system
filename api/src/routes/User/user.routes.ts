import { Router } from "express";
import * as userController from '../../controllers/User/user.controller'

const userRoutes = Router();

userRoutes.get("/", userController.getUsers);
userRoutes.post("/", userController.createUser);
userRoutes.get("/:id", userController.getUser);
userRoutes.delete("/:id", userController.deleteUser);
userRoutes.put("/:id", userController.updateUser);

export default userRoutes;
