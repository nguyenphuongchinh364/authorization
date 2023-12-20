const User = require('../models/user');

exports.myProfile = async (req, res) => {
    try {

        const userId = req.user.user_id; // Lấy giá trị của user_id từ đối tượng decoded
        console.log(userId);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }



        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.deleteUserById = async (req, res) => {
    try {

        const userId = req.params.userId; // Lấy ID từ URL

        const isDeleted = await User.findByIdAndDelete(userId);

        if (!isDeleted) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.updateUserById = async (req, res) => {
    try {
        const userId = req.params.userId; // Lấy ID từ URL
        const role = req.params.roleId;
        const isUpdate = await User.findByIdAndDelete(userId);

        if (!isUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};



exports.updateUserRole = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Cập nhật quyền của người dùng
        user.role = req.params.userRole; // Thay đổi từ roleId sang userRole

        // Lưu thông tin người dùng đã được cập nhật vào cơ sở dữ liệu
        const updatedUser = await user.save();

        return res.status(200).json({ message: 'User role updated successfully', updatedUser });
    } catch (error) {
        return res.status(500).json({ message: `Failed to update user role: ${error.message}` });
    }
};



