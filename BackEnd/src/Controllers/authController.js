import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';  // Assuming you have Sequelize models for your User
import db from '../Database/database.js';

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
    const { name, email, role, skills, interests, bio, password } = req.body;

    // Convert skills array to a string
    const skillsString = Array.isArray(skills) ? skills.join(', ') : skills;

    // Log the skills
    console.log(skillsString);
    console.log(typeof (skillsString));

    try {
        // Check if the user already exists using SQL query
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Insert new user into the database
        const [result] = await db.query(
            `INSERT INTO users (name, email, role, skills, interests, bio, password) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, email, role, skillsString, interests, bio, hashedPassword]
        );

        if (result.affectedRows > 0) {
            res.status(201).json({ message: 'User registered successfully' });
        } else {
            res.status(500).json({ error: 'Failed to register user' });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Edit User Profile
const editprofile = async (req, res) => {
    const { name, email, role, skills, interests, bio } = req.body;
    const userId = req.params.id; // Assuming the user ID is passed as a URL parameter

    // Convert skills array to a string
    const skillsString = Array.isArray(skills) ? skills.join(', ') : skills;

    try {
        // Check if the user exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (existingUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Prepare the update query and parameters
        const updateValues = [name, email, role, skillsString, interests, bio];
        let updateQuery = 'UPDATE users SET name = ?, email = ?, role = ?, skills = ?, interests = ?, bio = ?';

        // Execute the update query
        const [result] = await db.query(updateQuery + ' WHERE id = ?', [...updateValues, userId]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Profile updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to update profile' });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Delete User Profile
const deleteprofile = async (req, res) => {
    const userId = req.params.id; // Assuming the user ID is passed as a URL parameter

    try {
        // Check if the user exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (existingUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete the user
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [userId]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Profile deleted successfully' });
        } else {
            res.status(500).json({ error: 'Failed to delete profile' });
        }
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ error: 'Database error' });
    }
};


// Login User
const login = async (req, res) => {
    const { email, password } = req.body;

    console.log(email);

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

        console.log(accessToken);

        // Omit password before sending user data
        const { password: _, ...userWithoutPassword } = foundUser;

        const options = {
            httpOnly: true,   // To make it accessible to JavaScript
            secure: true,  // to make it accessible to JavaScript
            sameSite: 'None', // To prevent CSRF attacks
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
        const { search, role } = req.query; // Extract query parameters

        // Fetch users from the database
        const users = await User.findAll(search);

        res.json(users); // Respond with filtered user data
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
    editprofile,
    deleteprofile,
    getAllUsers,
    logout,
}
