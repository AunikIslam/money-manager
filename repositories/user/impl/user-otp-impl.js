const Otp = require('../../../schemas/otp')
class UserOtpImpl {
    static async insertOtp(email) {
        return await Otp.insertOtp(email);
    }
}

module.exports = UserOtpImpl;