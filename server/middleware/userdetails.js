const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const userdetails = (req, res, next) => {
    const token = req.header('authtoken');
    if (!token) return res.status(401).json({ auth: false, message: 'No Token Provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user; // Assuming token contains user object with id and username
        next();
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return res.status(400).json({ auth: false, message: 'Failed to authenticate token.' });
    }
};

module.exports = userdetails;
