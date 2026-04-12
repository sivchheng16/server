import User from '../models/user-schema.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// signUp: Create a new user
export const signUp = async (req, res) => {
    console.log('SignUp Request Received:', req.body);
    const { firstName, lastName, email, password, role } = req.body;

    try {
        // Check if user already exists
        console.log('Checking existence for email:', email);
        const existingUser = await User.findOne({ email });
        console.log('Existing User matching email:', existingUser ? 'FOUND' : 'NOT FOUND');
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 12);

        // Create user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        await newUser.save();

        // Generate JWT for auto-login
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (err) {
        console.error('register error:', err);
        res.status(500).json({ message: 'Something went wrong during registration' });
    }
};

// signIn: Authenticate user and return token
export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Signed in successfully',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('login error:', err);
        res.status(500).json({ message: 'Something went wrong during sign-in' });
    }
};

// signOut: Placeholder for sign-out logic
export const signOut = (req, res) => {
    res.status(200).json({ message: 'User signed out successfully' });
};
