const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense-controller');

/**
 * @swagger
 * /expense/create:
 *   post:
 *     summary: Create expense
 *     tags: [expense-controller]
 *     operationId: expenses
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   type: string
 *                   example: "Food"
 *                 amount:
 *                   type: number
 *                   example: 100
 *                 account:
 *                   type: string
 *                   example: "Cash"
 *                 note:
 *                    type: string
 *                    example: "Ice cream"
 *                 description:
 *                    type: string
 *                    example: "Brought from Hena med market"
 *                 date:
 *                    type: string
 *                    example: "2025-10-20T18:30:00Z"
 *     responses:
 *       200:
 *         description: Expense created successfully
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
router.post('/create', expenseController.createExpense);
module.exports = router;