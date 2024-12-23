import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';  // Assuming you have Sequelize models for your User

// Method to compare password (using bcrypt)
const isPasswordCorrect = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

// Method to generate Access Token
const generateAccessToken = (user) => {
    return jwt.sign(
        {
            _id: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET, // Use the secret key from environment variables
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,  // Token expiry time from environment
        }
    );
}

// Register User
const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists using SQL query
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds

        // Create new user
        const newUser = await User.create({
            email,
            password: hashedPassword,  // Store the hashed password
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Login User
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if password matches
        const isPasswordValid = await isPasswordCorrect(password, user.password);

        if (!isPasswordValid) {
            return res.status(404).json({ message: 'Invalid password' });
        }

        // Generate the access token
        const accessToken = generateAccessToken(user);

        // Optionally, you can generate a refresh token here (if needed)

        // Send the token to the client
        res.json({ message: 'Login successful', accessToken });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Logout User
const logout = (req, res) => {
    req.session.destroy();  // Destroy session
    res.json({ message: 'Logout successful' });
};

export {
    register,
    login,
    logout,
}
