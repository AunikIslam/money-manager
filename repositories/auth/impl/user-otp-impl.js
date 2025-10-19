const Otp = require('../../../schemas/otp');
const User = require('../../../schemas/user');
const bcrypt = require('bcrypt');

class UserOtpImpl {
    static async insertOtp(email) {
        return await Otp.insertOtp(email);
    }

    static async verifyOtp(params) {
        const record = await Otp.findOne({email: params.email});
        if (!record) {
            throw new Error(`Otp already expired`);
        } else {
            if (params.otp === record.otp) {
                await User.create({
                    email: params.email,
                    password: await bcrypt.hash(params.password, 10)
                });
            } else {
                throw new Error(`Wrong otp`);
            }
        }
    }

    static login = async (email, password) => {
        const user = await User.findOne({email});
        if (!user) {
            throw new Error(`User does not exist`);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error(`Invalid email or password`);
        }
    }
}

module.exports = UserOtpImpl;