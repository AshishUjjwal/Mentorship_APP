import db from './database.js';

const connectdb = async () => {
    try {
        await db.query('SELECT 1'); // Test the database connection
        console.log('✅ Connected to the MySQL database');
    } catch (err) {
        console.log('❌ Error connecting to the database:', err);
        throw err; // Re-throw error to be handled by the caller
    }
};

export default connectdb;
