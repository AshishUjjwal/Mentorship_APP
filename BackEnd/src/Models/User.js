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
    findAll: async (search) => {
        try {
            console.log(`search 2: `, typeof (search));

            // Base query
            let query = 'SELECT * FROM users WHERE 1=1';
            const params = [];

            // Add search filter
            if (search) {
                query += ' AND (email LIKE ?)';
                params.push(`%${search}%`);
            }

            // Add role filter
            // if (role) {
            //     query += ' AND role = ?';
            //     params.push(role);
            // }

            // Execute query with parameters
            const [rows] = await db.query(query, params);
            // Filter out password in your application
            const usersWithoutPassword = rows.map(user => {
                const { password, ...userWithoutPassword } = user; // Remove 'password' field
                return userWithoutPassword;
            });

            return usersWithoutPassword;
        } catch (error) {
            console.error('Error fetching users with filters:', error);
            throw new Error('Error fetching users with filters');
        }
    }


};

export default User;
