const mongoose = require('mongoose');
const {generateOtp} = require("../utils/util-functions");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date
    }
});

otpSchema.statics.insertOtp = async function (email)  {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const otp = generateOtp();
    return await this.create({
        email: email,
        otp,
        expiresAt
    });
}

module.exports = mongoose.model('Otp', otpSchema);