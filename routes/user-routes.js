const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller')

/**
 * @swagger
 * /user/auth/signup:
 *   post:
 *     summary: Sign Up User
 *     tags: [user-controller]
 *     operationId: users
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 password:
 *                   type: string
 *                   example: "myStrongPassword123"
 *     responses:
 *       200:
 *         description: PDF File Downloaded
 *         content:
 *             application/pdf:
 *                  schema:
 *                      type: string
 *                      format: binary
 *       400:
 *         description: Bad Request
 *         content:
 *             application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/ErrorResponse400"
 *       401:
 *         description: Unauthorized
 *         content:
 *             application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/ErrorResponse401"
 *       500:
 *         description: Internal Server Error
 *         content:
 *             application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/ErrorResponse500"
 */
router.post('/auth/signup', userController.insertAndSendOtp);

module.exports = router;