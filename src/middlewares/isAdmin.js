const User = require('../models/user');
const Role = require('../models/role');

const checkAdmin = async (req, res, next) => {
    try {
        const userId = req.user.user_id;

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const roleName = user.role_name;

        if (roleName == "admin") {

            return next();
        } else {
            throw new Error('UnAdmin access');
        }

    } catch (error) {
        console.error(`checkAdmin error: ${error.message}`);
        return res.status(403).json({ message: 'UnAdmin access!' });
    }
};


module.exports = checkAdmin;
