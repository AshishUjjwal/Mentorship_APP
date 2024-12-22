// routes/profileRoutes.js

import express from 'express';
const router = express.Router();

import profileController from '../Controllers/profileController.js';

router.post('/create', profileController.createProfile);
router.put('/update', profileController.updateProfile);
router.delete('/delete', profileController.deleteProfile);

module.exports = router;