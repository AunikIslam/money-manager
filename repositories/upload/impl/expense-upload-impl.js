const multer = require('multer');
const rootDir = require('../../../utils/path');
const path = require('path');
const fs = require('fs');
const sessionContextService = require('../../../services/session-context-service')

class ExpenseUploadImpl {
    static prepareMulter() {
        const uploadDir = path.join(rootDir, 'uploads', 'expenses');
        if (!fs.existsSync(uploadDir)) {
            // recursive will create an uploads directory if it does not exist
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadDir);
            },
            filename: (req, file, cb) => {
                const name = `${sessionContextService.getUserId()}_expense.xlsx`;
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
           if (!data.category) {
               invalidEntries.push({

               })
           }
        });
    }
}

module.exports = ExpenseUploadImpl;