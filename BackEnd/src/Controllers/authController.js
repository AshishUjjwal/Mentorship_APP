import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  User  from '../Models/User.js';  // Assuming you have Sequelize models for your User

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
        // const existingUser = await User.findOne({ where: { email } });
        // if (existingUser) {
        //     return res.status(400).json({ error: 'User already exists' });
        // }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds

        // Create new user
        const newUser = await User.create(
            email,
            hashedPassword,  // Store the hashed password
        );

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
        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Get the first user from the query result (assuming it's an array)
        const foundUser = user[0];

        // Check if password matches
        const isPasswordValid = await isPasswordCorrect(password, foundUser.password);

        if (!isPasswordValid) {
            return res.status(404).json({ message: 'Invalid password' });
        }

        // Generate the access token
        const accessToken = generateAccessToken(foundUser);

        // Omit password before sending user data
        const { password: _, ...userWithoutPassword } = foundUser;

        const options = {
            httpOnly: true,   // To make it accessible to JavaScript
            secure: true,  // to make it accessible to JavaScript
            // sameSite: 'Strict', // To prevent CSRF attacks
        }

        // Send the token and user info (excluding password) to the client
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json({ message: 'Login successful', accessToken, user: userWithoutPassword });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // Exclude password field from response
        });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
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
    getAllUsers,
    logout,
}
