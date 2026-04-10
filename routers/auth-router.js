import express from 'express';
import { signup, signin, signout } from '../controllers/authController.js';

const router = express.Router();

// Registration Route
router.post('/signup', signup);

// Login Route
router.post('/signin', signin);

router.post('/signout', signout);

export default router;
