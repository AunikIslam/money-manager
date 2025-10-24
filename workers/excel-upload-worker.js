const {Worker} = require('bullmq');
const IORedis = require('ioredis');
const ExcelJs = require('exceljs');
const Expense = require('../schemas/expense');
const fs = require('fs');

const connection = new IORedis({
    maxRetriesPerRequest: null
});

const worker = new Worker(
    'excel-processing',
    async job => {
        const { filePath } = job.data;
        const workBook = new ExcelJs.Workbook();
        await workBook.xlsx.readFile(filePath);

        const workSheet = workBook.worksheets[0];
        console.log(workSheet);
        fs.unlinkSync(filePath);
        console.log(`Processed and deleted: ${filePath}`);
    },
    {
        connection
    }
)
worker.on('completed', job => console.log(`Job ${job.id} completed`));
worker.on('failed', (job, err) => console.error(`Job ${job.id} failed: ${err.message}`));