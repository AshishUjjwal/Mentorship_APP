import db from '../Database/database.js';

const User = {
    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
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
    }
};

export default User;
