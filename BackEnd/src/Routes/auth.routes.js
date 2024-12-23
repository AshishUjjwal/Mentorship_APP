// routes/authRoutes.js

import { Router } from 'express';
const router = Router();

import { register, login } from '../Controllers/authController.js';
import { verifyJWT } from '../Middleware/auth.middleware.js';


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(verifyJWT, logout);

export default router;
