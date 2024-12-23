import db from '../Database/database.js';

const User = {
    findByEmail: async (email) => {
        console.log(`findByEmail :`, email);
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log(rows);
        return rows;
    },

    create: async (email, password) => {
        console.log(`Email: `, email);
        console.log(`Password: `, password);
        await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    },

    findByCredentials: async (email, password) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        return rows;
    },

    // Find all users
    findAll: async () => {
        try {
            const [rows] = await db.query('SELECT * FROM users');
            return rows;
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw new Error('Error fetching all users');
        }
    }


};

export default User;
