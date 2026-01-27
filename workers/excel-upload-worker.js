// const {Worker} = require('bullmq');
// const IORedis = require('ioredis');
// const ExcelJs = require('exceljs');
// const Expense = require('../schemas/expense');
// const ExpenseErrorEntry = require('../schemas/expense-upload');
// const ExpenseUploadImpl = require('../repositories/upload/impl/expense-upload-impl')
// const fs = require('fs');
// const utilFunctions = require('../utils/util-functions')
// const path = require("path");
// const rootDir = require("../utils/path");
// const AttachmentEmailImpl = require('../repositories/expense/impl/attachment-email-impl');
// const dbConnection = require('../utils/database-connection');
// const redisConnection = require('../config/redis-config');
//
// (async () => {
//     await dbConnection.connectDB()
//
//     const connection = redisConnection.createRedisConnection();
//
//     const worker = new Worker(
//         'excel-processing', // queue name
//         async job => {
//             const {filePath, userId} = job.data;
//             const docs = await ExpenseUploadImpl.fetchData(filePath, userId)
//             const preparedEntries = ExpenseUploadImpl.prepareUploadData(docs);
//             const workBook = await ExpenseUploadImpl.prepareExcelForEmail(preparedEntries);
//             const email = await AttachmentEmailImpl.sendAttachmentsEmail(workBook, userId);
//             fs.unlinkSync(filePath);
//             console.log(`Processed and deleted: ${filePath}`);
//         },
//         {
//             connection
//         }
//     )
//     worker.on('completed', job => console.log(`Job ${job.id} completed`));
//     worker.on('failed', (job, err) => console.error(`Job ${job.id} failed: ${err.message}`));
//     worker.on('ready', () => {
//         console.log(`Worker is running`)
//     });
// })();
//
