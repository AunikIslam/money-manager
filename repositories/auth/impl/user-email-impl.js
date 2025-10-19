const nodeMailer = require('nodemailer');
const User = require('../../../schemas/user');
const apiResponse = require("../../../models/api-response");
class UserEmailImpl {

    static async sendSignUpOtpEmail(email, otp) {
        const transporter = this.createTransporter();
        try {
            await transporter.sendMail({
                from: process.env.SENDER_MAIL,
                to: email,
                subject: 'Your signup email for Money Manager',
                text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    static createTransporter() {
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
}

module.exports = UserEmailImpl;