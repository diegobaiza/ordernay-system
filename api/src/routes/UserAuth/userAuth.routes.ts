import { Router } from 'express';
import { authController } from './userAuth.controller';

const router = Router();

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.get('/verify-token', authController.verifyToken.bind(authController));

export default router;
