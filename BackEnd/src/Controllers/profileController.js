// controllers/profileController.js
import Profile from '../Models/Profile.js';

exports.createProfile = async (req, res) => {
    const { name, role, skills, interests, bio } = req.body;
    const userId = req.session.userId;
    try {
        await Profile.create(userId, name, role, skills, interests, bio);
        res.status(201).json({ message: 'Profile created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

exports.updateProfile = async (req, res) => {
    const { name, role, skills, interests, bio } = req.body;
    const userId = req.session.userId;
    try {
        await Profile.update(userId, name, role, skills, interests, bio);
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

exports.deleteProfile = async (req, res) => {
    const userId = req.session.userId;
    try {
        await Profile.delete(userId);
        res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};