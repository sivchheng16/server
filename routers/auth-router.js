import express from 'express';
import { signUp, signIn, signOut } from '../controllers/authController.js';

const router = express.Router();

// Registration Route
router.post('/sign-up', signUp);

// Login Route
router.post('/sign-in', signIn);

router.post('/sign-out', signOut);

export default router;
