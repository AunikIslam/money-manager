const ExpenseUploadImpl = require('../repositories/upload/impl/expense-upload-impl');
const ApiResponse = require('../models/api-response');
const ExcelQueue = require('../queues/excel-queue');
const SessionContextService = require('../services/session-context-service');

exports.uploadExpenseExcel = async function(req, res) {
    if (!req.file) {
        return res.status(400).send(new ApiResponse.Error(['Select a file'], 400));
    }
    try {
        console.log(`Request received`)
        await ExcelQueue.excelQueue.add(
            'parse-expense', // add job 'parse-expense' to the queue
            {
                filePath: req.file.path,
                userId: SessionContextService.getUserId()
            }
        )
        return res.status(200).send(new ApiResponse.Success(`File uploaded successfully.`));

    } catch (error) {
        console.log(`Error from upload controller ${error.message}`);
        return res.status(400).send(new ApiResponse.Error(['Something went wrong'], 400));
    }
}