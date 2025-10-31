const {Worker} = require('bullmq');
const IORedis = require('ioredis');
const ExcelJs = require('exceljs');
const Expense = require('../schemas/expense');
const ExpenseErrorEntry = require('../schemas/expense-error-entry');
const ExpenseUploadImpl = require('../repositories/upload/impl/expense-upload-impl')
const fs = require('fs');
const utilFunctions = require('../utils/util-functions')

const connection = new IORedis({
    maxRetriesPerRequest: null
});

const worker = new Worker(
    'excel-processing', // queue name
    async job => {
        const { filePath, userId } = job.data;
        const docs = await ExpenseUploadImpl.fetchData(filePath, userId)
        const preparedEntries = ExpenseUploadImpl.prepareUploadData(docs);
        fs.unlinkSync(filePath);
        console.log(`Processed and deleted: ${filePath}`);
    },
    {
        connection
    }
)
worker.on('completed', job => console.log(`Job ${job.id} completed`));
worker.on('failed', (job, err) => console.error(`Job ${job.id} failed: ${err.message}`));
worker.on('ready', () => {console.log(`Worker is running`)});