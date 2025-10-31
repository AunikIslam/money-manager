const multer = require('multer');
const rootDir = require('../../../utils/path');
const path = require('path');
const fs = require('fs');
const sessionContextService = require('../../../services/session-context-service');
const ErrorEntry = require('../../../schemas/expense-error-entry');

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

    static prepareUploadData(data) {
        const validEntries = [];
        const invalidEntries = [];

        data.forEach(pData => {
            let error = null;
            if (!pData.category) {
                error = 'Category not available'
            }
            else if (!pData.amount) {
                error = 'Amount not available'
            }
            else if (!pData.account) {
                error = 'Account not available'
            }
            else if (!pData.date) {
                error = 'Date not available'
            }
            else if (!pData.time) {
                error = 'Time not available'
            }
            else if (!pData.transaction_type) {
                error = 'Transaction type not available'
            }
            const errorEntry =
                new ErrorEntry()
                    .setCategory(data.category)
                    .setAmount(data.amount)
                    .setAccount(data.account)
                    .setNote(data.note)
                    .setDescription(data.description)
                    .setDate(data.date)
                    .setTime(data.time)
                    .setTransactionType(data.transaction_type)
                    .setError(error)

            invalidEntries.push(errorEntry);
        });
        console.log(invalidEntries);
    }
}

module.exports = ExpenseUploadImpl;