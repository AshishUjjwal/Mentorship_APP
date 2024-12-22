// routes/requestRoutes.js

import express from 'express';
const router = express.Router();

import requestController from '../Controllers/requestController.js';

router.post('/send', requestController.sendRequest);
router.put('/manage', requestController.manageRequest);

module.exports = router;