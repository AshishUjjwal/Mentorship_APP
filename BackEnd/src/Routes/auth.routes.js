// routes/authRoutes.js

import { Router } from 'express';
const router = Router();

import { register } from '../Controllers/authController.js';


router.route('/register').post(register);
// router.post('/login', authController.login);
// router.post('/logout', authController.logout);

export default router;
