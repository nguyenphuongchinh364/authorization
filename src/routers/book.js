const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkroleMiddleware');

router.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

// Route để tạo sách mới
router.post('/create', auth, checkRole, bookController.createBook);

// Route để lấy tất cả sách
router.get('/read/all', auth, checkRole, bookController.getAllBooks);

// Route để lấy thông tin sách theo ID
router.get('/read/:id', auth, checkRole, bookController.getBookById);

// Route để cập nhật thông tin sách theo ID
router.put('/update/:id', auth, checkRole, bookController.updateBookById);

// Route để xóa sách theo ID
router.delete('/delete/:id', auth, checkRole, bookController.deleteBookById);

module.exports = router;
