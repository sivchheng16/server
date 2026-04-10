import User from '../models/user-schema.js';

// GET ALL USERS: Fetch all users (usually admin only)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude passwords
        res.status(200).json(users);
    } catch (err) {
        console.error('Fetch users error:', err);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// GET PROFILE: Fetch details of a single user
export const getProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id, '-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Fetch profile error:', err);
        res.status(500).json({ message: 'Error fetching profile' });
    }
};

// UPDATE PROFILE: Modify user details
export const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (err) {
        console.error('Update profile error:', err);
        res.status(500).json({ message: 'Error updating profile' });
    }
};
