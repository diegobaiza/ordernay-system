import { Router } from 'express';
import * as userRoleController from '../../controllers/UserRole/userRole.controller'

const userRoleRouter = Router();

userRoleRouter.get('/', userRoleController.getUserRoles);
userRoleRouter.post('/', userRoleController.createUserRole);
userRoleRouter.get('/:id', userRoleController.getUserRole);
userRoleRouter.delete('/:id', userRoleController.deleteUserRole);

export default userRoleRouter;
