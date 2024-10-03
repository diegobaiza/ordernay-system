import { Router } from "express";
import { RoleController } from "../../controllers/Role/role.controller";

const roleRoutes = Router();

roleRoutes.get("/", RoleController.getRoles);
roleRoutes.post("/", RoleController.createRole);
roleRoutes.get("/:id", RoleController.getRole);
roleRoutes.put("/:id", RoleController.updateRole);
roleRoutes.delete("/:id", RoleController.deleteRole);

export default roleRoutes;
