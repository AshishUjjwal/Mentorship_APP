// models/Request.js
class Request {
    static async create(senderId, recipientId) {
        await db.query('INSERT INTO mentorship_requests (sender_id, recipient_id) VALUES (?, ?)', [senderId, recipientId]);
    }

    static async updateStatus(requestId, status) {
        await db.query('UPDATE mentorship_requests SET status = ? WHERE id = ?', [status, requestId]);
    }
}

module.exports = Request;