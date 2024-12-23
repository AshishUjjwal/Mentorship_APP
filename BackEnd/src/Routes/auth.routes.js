// routes/authRoutes.js

import { Router } from 'express';
const router = Router();

import { register, login, logout, getAllUsers } from '../Controllers/authController.js';
import { verifyJWT } from '../Middleware/auth.middleware.js';


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(verifyJWT, logout);

router.route('/getallusers').get(verifyJWT, getAllUsers);

export default router;
