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
            if (rowNumber === 1) return; // skip header
            docs.push({
                user_id: userId,
                category: row.getCell(1).value,
                amount: row.getCell(2).value,
                account: row.getCell(3).value,
                note: row.getCell(4).value,
                date: utilFunctions.datePipe(row.getCell(5).value, 'yyyy-mm-dd'),
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
                    .setCategory(data.category)
                    .setAmount(data.amount)
                    .setAccount(data.account)
                    .setNote(data.note)
                    .setDescription(data.description)
                    .setDate(data.date)
                    .setTime(data.time)
                    .setTransactionType(data.transaction_type)
                    .setStatus(status)

            entries.push(entry);
        });
        return entries;
    }

    static async prepareExcelForEmail() {
        const workbook = new ExcelJs.Workbook();
        const sheet = workbook.addWorksheet('Expenses');

        // Title
        sheet.mergeCells('A1:C1');
        const titleCell = sheet.getCell('A1');
        titleCell.value = 'Expenses';
        titleCell.font = {
            size: 16,
            bold: true
        };
        titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
        return workbook;
    }
}

module.exports = ExpenseUploadImpl;