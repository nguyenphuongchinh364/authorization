/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - role_name
 *       properties:
 *         role_name:
 *           type: string
 *           description: The name of the role
 *     Permissions:
 *       type: object
 *       properties:
 *         books:
 *           type: object
 *           properties:
 *             create:
 *               type: boolean
 *             read:
 *               type: boolean
 *             update:
 *               type: boolean
 *             delete:
 *               type: boolean
 *         users:
 *           type: object
 *           properties:
 *             create:
 *               type: boolean
 *             read:
 *               type: boolean
 *             update:
 *               type: boolean
 *             delete:
 *               type: boolean
 *   tags:
 *     name: Roles
 *     description: APIs for managing roles
 */

/**
 * @swagger
 * /role/read/all:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */

/**
 * @swagger
 * /role/create:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 role_name:
 *                    type: string
 *                 permissions:
 *                    $ref: '#/components/schemas/Permissions'
 *     responses:
 *       201:
 *         description: New role created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /role/read/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role details by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 */
/**
 * @swagger
 * /role/update/{id}:
 *   put:
 *     summary: Update role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Updated role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 */
/**
 * @swagger
 * /role/delete/{id}:
 *   delete:
 *     summary: Delete role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 */







const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const auth = require('../middlewares/authMiddleware');
const checkAdmin = require('../middlewares/isAdmin');

router.get("/read/all", auth, checkAdmin, roleController.getAllRoles);

// Route để tạo mới vai trò
router.post('/create', auth, checkAdmin, roleController.createRole);

// Route để lấy thông tin vai trò theo ID
router.get('/read/:id', auth, checkAdmin, roleController.getRoleById);

// Route để cập nhật thông tin vai trò theo ID
router.put('/update/:id', auth, checkAdmin, roleController.updateRoleById);

// Route để xóa vai trò theo ID
router.delete('/delete/:id', auth, checkAdmin, roleController.deleteRoleById);

module.exports = router;
