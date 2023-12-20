const jwt = require('jsonwebtoken');

const authConfig = {
    secretKey: 'your_secret_key_here',
};

const generateToken = (payload) => {
    return jwt.sign(payload, authConfig.secretKey, { expiresIn: '2h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, authConfig.secretKey);
    } catch (err) {
        return null;
    }
};

module.exports = { authConfig, generateToken, verifyToken };