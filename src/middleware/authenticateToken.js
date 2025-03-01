const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;


const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = { id: decoded.id };
        next();
        console.log(decoded, 'ed');
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

module.exports = authenticateToken;

