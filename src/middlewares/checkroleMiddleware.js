const User = require('../models/user');
const Role = require('../models/role');

const checkRole = (permission) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.user_id;
            const [modelName, action] = permission.split('/');
            // const urlParts = req.originalUrl.split('/'); // Split URL by '/'
            // const modelName = urlParts[1]; // Assuming modelName is at index 2
            // const action = urlParts[2]; // Assuming action is at index 3

            // // Check if modelName and action were extracted correctly
            // console.log('Model Name:', modelName);
            // console.log('Action:', action);


            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const roleName = user.role_name;
            const role = await Role.findOne({ role_name: roleName });
            if (!role) {
                throw new Error('Role not found');
            }

            const modelPermissions = role.permissions[modelName];

            if (!modelPermissions) {
                throw new Error('Model not found in permissions');
            }

            if (modelPermissions[action]) {
                return next();
            } else {
                throw new Error('Unauthorized access');
            }
        } catch (error) {
            console.error(`Check role error: ${error.message}`);
            return res.status(403).json({ message: 'Unauthorized access' });
        }
    };
};

module.exports = checkRole;
