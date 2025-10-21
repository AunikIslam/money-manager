const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller')

/**
 * @swagger
 * /auth/get-otp:
 *   post:
 *     summary: Get OTP
 *     tags: [auth-controller]
 *     operationId: get_otp
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "aunikislam172@gmail.com"
 *     responses:
 *       200:
 *         description: OTP sent successfully
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
router.post('/get-otp', authController.insertAndSendOtp);

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify user otp
 *     tags: [auth-controller]
 *     operationId: verify_otp
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "aunikislam172@gmail.com"
 *                 password:
 *                   type: string
 *                   example: "myStrongPassword123"
 *                 otp:
 *                   type: number
 *                   example: 12345
 *     responses:
 *       200:
 *         description: User created
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
router.post('/verify-otp', authController.verifyOtp);

/**
 * @swagger
 * /auth/get-token:
 *   post:
 *     summary: Get token
 *     tags: [auth-controller]
 *     operationId: get_token
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "aunikislam172@gmail.com"
 *     responses:
 *       200:
 *         description: User created
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
router.post('/get-token', authController.getToken);

module.exports = router;