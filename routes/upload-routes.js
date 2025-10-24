const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload-controller');
const ExpenseUploadIml = require('../repositories/upload/impl/expense-upload-impl');

/**
 * @swagger
 * /upload/expense:
 *   post:
 *     summary: Submit expense excel file
 *     tags: [expense-controller]
 *     operationId: expense_upload
 *     requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 file:
 *                   type: string
 *                   format: binary
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
const multer = ExpenseUploadIml.prepareMulter();
router.post('/expense', multer.single('file'), uploadController.uploadExpenseExcel);

module.exports = router;
