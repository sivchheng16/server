import express from 'express';
import { getUsers, getProfile, updateProfile } from '../controllers/userController.js';

const router = express.Router();

// Get all users
router.get("/", getUsers)

// Get User Profile
router.get('/profile/:id', getProfile);

// Update User Profile
router.put('/profile/:id', updateProfile);

export default router;
