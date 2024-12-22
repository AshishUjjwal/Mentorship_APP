// controllers/authController.js
import User from '../Models/User.js';

const register = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
        await User.create(email, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        if (user.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        req.session.userId = user[0].id;
        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

const logout = (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logout successful' });
};

export {
    register,
    login,
    logout,
}