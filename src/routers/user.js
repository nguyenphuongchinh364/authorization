const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkroleMiddleware');
const { CREATE, READ, UPDATE, DELETE } = require('../config/permission/user');

router.get("/read/myProfile", auth, userController.myProfile);

// Route để lấy tất cả người dùng (Chỉ admin có quyền)
router.get('/read/all', auth, checkRole(READ), userController.getAllUsers);

// Route để xóa người dùng theo ID
router.delete('/delete/:userId', auth, checkRole(DELETE), userController.deleteUserById);

// Route để cập nhật người dùng theo ID
router.put('/update/:userId', auth, checkRole(UPDATE), userController.updateUserById);

// Route để cập nhật vai trò của người dùng theo ID
router.put('/update/:userId/:userRole', auth, checkRole(UPDATE), userController.updateUserRole);

module.exports = router;
