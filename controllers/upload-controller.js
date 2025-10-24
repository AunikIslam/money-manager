const ExpenseUploadImpl = require('../repositories/upload/impl/expense-upload-impl');
const ApiResponse = require('../models/api-response');
const ExcelQueue = require('../queues/excel-queue')

exports.uploadExpenseExcel = async function(req, res) {
    if (!req.file) {
        return res.status(400).send(new ApiResponse.Error(['Select a file'], 400));
    }
    try {
        await ExcelQueue.excelQueue.add(
            'parse-expense',
            {
                filePath: req.file.path,
            }
        )
        return res.status(200).send(new ApiResponse.Success(`File uploaded successfully.`));

    } catch (error) {
        return res.status(400).send(new ApiResponse.Error(['Something went wrong'], 400));
    }
}