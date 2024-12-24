// routes/authRoutes.js

import { Router } from 'express';
const router = Router();

import { sendRequest, acceptRequest, declineRequest } from '../Controllers/mentorAssignController.js';
import { verifyMentee, verifyMentor } from '../Middleware/auth.middleware.js';


router.route('/sendrequest').post(verifyMentee, sendRequest);
router.route('/acceptrequest').post(verifyMentor, acceptRequest);
router.route('/declinerequest').post(verifyMentor, declineRequest);

router.route('/getallusers').get( getAllUsers);

export default router;
