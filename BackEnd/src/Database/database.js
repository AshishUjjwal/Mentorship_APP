import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, // Wait for available connection if none available
    connectionLimit: 10,      // Max number of connections in the pool
    queueLimit: 0             // No limit for query queue
});

export default pool;