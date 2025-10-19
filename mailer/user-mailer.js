const nodemailer = require('nodemailer');

exports.sendOtpMail = async  (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: `Registration otp from money manager`,
        text: `Your one time password is ${otp}`,
    });
}