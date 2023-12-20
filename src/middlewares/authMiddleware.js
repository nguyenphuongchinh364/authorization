const jwt = require("jsonwebtoken");
const config = process.env;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).send("A valid token is required for authentication");
    }

    const token = authHeader.split(" ")[1]; // Lấy token từ header Authorization

    if (!token) {
        return res.status(403).send("A valid token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};

module.exports = authMiddleware;
