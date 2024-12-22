// index.js: Entry point for the application
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectdb from './src/Database/connectdb.js';

const app = express();

import authRoutes from './src/Routes/auth.routes.js';
// import profileRoutes from './src/routes/profileRoutes.js';
// import requestRoutes from './src/routes/requestRoutes.js';

// Middleware
app.use(bodyParser.json());

// Setup session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a more secure key in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set `secure: true` if you're using HTTPS
}));

// Routes
app.use('/auth', authRoutes);
// http://localhost:8000/auth/*

// app.use('/profile', profileRoutes);
// app.use('/requests', requestRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 8000;

connectdb()
    .then(() => {
        app.listen(PORT || 8000, () => {
            console.log(`⚙️Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('Error connecting to the database', err);
        process.exit(1);  // Exit the process with an error code of 1
    });