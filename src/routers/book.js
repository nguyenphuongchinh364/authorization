/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - genre
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         genre:
 *           type: string
 *           description: The genre of the book
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: APIs for managing books
 */

/**
 * @swagger
 * /book/create:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The created book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /book/read/all:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *  
 * /book/read/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 * /book/update/{id}:
 *   put:
 *     summary: Update book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Updated book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 * /book/delete/{id}:
 *   delete:
 *     summary: Delete book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkroleMiddleware');
// Other file
const { CREATE, READ, UPDATE, DELETE } = require('../config/permission/book');

router.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

router.post('/create', auth, checkRole(CREATE), bookController.createBook);

router.get('/read/all', auth, checkRole(READ), bookController.getAllBooks);

router.get('/read/:id', auth, checkRole(READ), bookController.getBookById);

router.put('/update/:id', auth, checkRole(UPDATE), bookController.updateBookById);

router.delete('/delete/:id', auth, checkRole(DELETE), bookController.deleteBookById);

module.exports = router;
