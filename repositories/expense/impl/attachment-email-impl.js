const nodeMailer = require('nodemailer');
const User = require('../../../schemas/user');
const apiResponse = require("../../../models/api-response");
const fs = require("fs");
const path = require("path");
const rootDir = require("../../../utils/path");
const mongoose = require('mongoose');
const environmentConfig = require('../../../config/environment-config');
const app = require("../../../app");

class AttachmentEmailImpl {

    static createTransporter() {
        console.log(process.env.MAIL_HOST);
        console.log(process.env.MAIL_PORT);
        return nodeMailer.createTransport(
            {
                address: 'smtp.gmail.com',
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                auth: {
                    user: process.env.SENDER_MAIL,
                    pass: process.env.APP_PASSWORD
                }
            }
        );

    }

    static async sendAttachmentsEmail(workBook, userId) {
        const transporter = this.createTransporter();
        mongoose.connect(environmentConfig.mongodbURI)
            .then(async (client) => {
                const email = await User.findById(userId, 'email');
                const dirPath = path.join(rootDir, 'email-attachments', 'expenses');
                if (!fs.existsSync(dirPath)) {
                    // recursive will create an uploads directory if it does not exist
                    fs.mkdirSync(dirPath, {recursive: true});
                }
                const filePath = path.join(dirPath, `${userId}_expense.xlsx`);

                await workBook.xlsx.writeFile(filePath);

                try {
                    console.log(email.email);
                    await transporter.sendMail({
                        from: process.env.SENDER_MAIL,
                        to: email.email,
                        subject: 'Your expense upload summary',
                        attachments: [{filename: `${userId}_expenses.xlsx`, path: filePath}]
                    });
                    fs.unlinkSync(filePath);
                } catch (error) {
                    console.log(error.message);
                }
            })


    }
}

module.exports = AttachmentEmailImpl;