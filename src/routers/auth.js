/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request or user already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials or missing input
 *       500:
 *         description: Internal server error
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Add middleware to authenticate the token here...

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
