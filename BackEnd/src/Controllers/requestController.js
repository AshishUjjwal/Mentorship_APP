
import Request from '../Models/Request';

exports.sendRequest = async (req, res) => {
    const { recipientId } = req.body;
    const senderId = req.session.userId;
    try {
        await Request.create(senderId, recipientId);
        res.status(201).json({ message: 'Request sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

exports.manageRequest = async (req, res) => {
    const { requestId, action } = req.body;
    try {
        if (action === 'accept') {
            await Request.updateStatus(requestId, 'accepted');
        } else if (action === 'decline') {
            await Request.updateStatus(requestId, 'declined');
        }
        res.json({ message: `Request ${action}ed successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};