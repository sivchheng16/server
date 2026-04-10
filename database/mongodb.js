import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        // We throw the error so the server can handle the fallback logic if desired
        throw err;
    }
};

export default connectDB;
