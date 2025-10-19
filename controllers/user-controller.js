const userOtpImpl = require('../repositories/user/impl/user-otp-impl');
const userEmailImpl = require('../repositories/user/impl/user-email-impl');
exports.insertAndSendOtp = async (req,res) => {
    const response  = await userOtpImpl.insertOtp(req.body.email);
    await userEmailImpl.sendSignUpOtpEmail(response.email, response.otp);
    apiResponse
}