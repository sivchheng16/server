import express from 'express';
import { register, login, loginout } from '../controllers/authController.js';

const router = express.Router();

// Registration Route
router.post('/register', register);

// Login Route
router.post('/login', login);

router.post('/loginout', loginout);

export default router;
