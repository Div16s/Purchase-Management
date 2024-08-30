import express from 'express';
import { updateUserProfile, userLogin, verifyOTP_userLogin, userSignup, verifyOTP_userSignup } from '../controllers/authController.js';
import authenticateToken from '../utils/authenticateToken.js';
const router = new express.Router();

router.post('/signup',userSignup);
router.post('/verifyOTP_signup',verifyOTP_userSignup);
router.post('/login',userLogin)
router.post('/verifyOTP_login',verifyOTP_userLogin);
router.post('/update', authenticateToken, updateUserProfile);


export default router;