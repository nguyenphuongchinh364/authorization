const Book = require('../models/book'); // Đường dẫn đến model sách của bạn

// CREATE - Tạo sách mới
exports.createBook = async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        const newBook = new Book({ title, author, genre });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ - Lấy danh sách tất cả sách
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ - Lấy thông tin sách theo ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE - Cập nhật thông tin sách theo ID
exports.updateBookById = async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, genre }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE - Xóa sách theo ID
exports.deleteBookById = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
