const multer = require('multer');
const rootDir = require('../../../utils/path');
const path = require('path');
const fs = require('fs');
const sessionContextService = require('../../../services/session-context-service');
const ExcelJs = require('exceljs');
const ExpenseUpload = require('../../../schemas/expense-upload');
const utilFunctions = require('../../../utils/util-functions')

class ExpenseUploadImpl {
    static prepareMulter() {
        const uploadDir = path.join(rootDir, 'uploads', 'expenses');
        if (!fs.existsSync(uploadDir)) {
            // recursive will create an uploads directory if it does not exist
            fs.mkdirSync(uploadDir, {recursive: true});
        }

        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadDir);
            },
            filename: (req, file, cb) => {
                const name = `${Date.now()}_expense.xlsx`;
                cb(null, name);
            }
        });

        const fileFilter = (req, file, cb) => {
            if (
                file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.mimetype === 'application/vnd.ms-excel'
            ) {
                cb(null, true);
            } else {
                cb(new Error('Only Excel files are allowed!'), false);
            }
        };
        return multer({storage, fileFilter});
    }

    static async fetchData(filePath, userId) {
        const workBook = new ExcelJs.Workbook();
        await workBook.xlsx.readFile(filePath);

        const workSheet = workBook.worksheets[0];
        const docs = [];
        workSheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return;
            docs.push({
                user_id: userId,
                category: row.getCell(1).value,
                amount: row.getCell(2).value,
                account: row.getCell(3).value,
                note: row.getCell(4).value,
                date: utilFunctions.datePipe(row.getCell(5).value, 'yyyy-MM-dd'),
                time: utilFunctions.datePipe(row.getCell(6).value, 'hh:mm:ss'),
                transaction_type: row.getCell(7).value
            });
        });
        return docs;
    }

    static prepareUploadData(data) {
        const entries = [];

        data.forEach(pData => {
            let status = null;
            if (!pData.category) {
                status = 'Category not available'
            }
            else if (!pData.amount) {
                status = 'Amount not available'
            }
            else if (!pData.account) {
                status = 'Account not available'
            }
            else if (!pData.date) {
                status = 'Date not available'
            }
            else if (!pData.time) {
                status = 'Time not available'
            }
            else if (!pData.transaction_type) {
                status = 'Transaction type not available'
            }
            else {
                status = 'Success'
            }
            const entry =
                new ExpenseUpload()
                    .setCategory(pData.category)
                    .setAmount(pData.amount)
                    .setAccount(pData.account)
                    .setNote(pData.note)
                    .setDescription(pData.description)
                    .setDate(pData.date)
                    .setTime(pData.time)
                    .setTransactionType(pData.transaction_type)
                    .setStatus(status)

            entries.push(entry);
        });
        return entries;
    }

    static async prepareExcelForEmail(data) {
        console.log(data)
        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet('Expenses');

        // Title
        worksheet.mergeCells('A1:C2');
        const titleCell = worksheet.getCell('A1');
        titleCell.value = 'Expenses';
        titleCell.font = {
            size: 20,
            bold: true
        };
        titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

        // Header row
        worksheet.columns = [
            {
                key: 'category'
            },
            {
                key: 'amount'
            },
            {
                key: 'account'
            },
            {
                key: 'note'
            },
            {
                key: 'date'
            },
            {
                key: 'time'
            },
            {
                key: 'transactionType'
            },
            {
                key: 'status'
            }
        ]

        const headerRow = worksheet.getRow(3);
        headerRow.values = ['Category', 'Amount', 'Account', 'Note', 'Date', 'Time', 'Transaction Type', 'Status'];

        headerRow.font = { bold: true, size: 16, color: { argb: '00000000' } };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF99CCFF' },
        };
        headerRow.alignment = { horizontal: 'center' };

        const dataRowStartNumber = 4;
        for (let i = 0; i < data.length; i++) {
            const row = worksheet.getRow(dataRowStartNumber + i);
            row.font = { bold: false, size: 16, color: { argb: 'FF000000' } };
            row.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: i % 2 === 0 ? 'FFC0C0C0' : 'FFFFFFFF' },
            };
            row.alignment = {
                horizontal: 'center',
            }
            row.values = {
                category: data[i].category,
                amount: data[i].amount,
                account: data[i].account,
                note: data[i].note,
                date: data[i].date,
                time: data[i].time,
                transactionType: data[i].transactionType,
                status: data[i].status
            }
            worksheet.addRow(row)
        }


        worksheet.columns.forEach(column => {
            worksheet.getColumn(column.key).width = utilFunctions.prepareColumnWidth(worksheet, column.key);
        });

        return workbook;
    }
}

module.exports = ExpenseUploadImpl;