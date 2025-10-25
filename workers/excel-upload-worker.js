const {Worker} = require('bullmq');
const IORedis = require('ioredis');
const ExcelJs = require('exceljs');
const Expense = require('../schemas/expense');
const fs = require('fs');

const connection = new IORedis({
    maxRetriesPerRequest: null
});

const worker = new Worker(
    'excel-processing', // queue name
    async job => {
        const { filePath, userId } = job.data;
        const workBook = new ExcelJs.Workbook();
        await workBook.xlsx.readFile(filePath);

        const workSheet = workBook.worksheets[0];
        const docs = [];
        workSheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return; // skip header
            docs.push({
                user_id: userId,
                category: row.getCell(1).value,
                amount: row.getCell(2).value,
                account: row.getCell(3).value,
                note: row.getCell(4).value,
                date: row.getCell(5).value,
                time: row.getCell(6).value,
                transaction_type: row.getCell(7).value
            });
        });

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