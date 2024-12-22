// models/Profile.js
class Profile {
    static async create(userId, name, role, skills, interests, bio) {
        await db.query('INSERT INTO profiles (user_id, name, role, skills, interests, bio) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, name, role, skills, interests, bio]);
    }

    static async update(userId, name, role, skills, interests, bio) {
        await db.query('UPDATE profiles SET name = ?, role = ?, skills = ?, interests = ?, bio = ? WHERE user_id = ?',
            [name, role, skills, interests, bio, userId]);
    }

    static async delete(userId) {
        await db.query('DELETE FROM profiles WHERE user_id = ?', [userId]);
    }
}

module.exports = Profile;
