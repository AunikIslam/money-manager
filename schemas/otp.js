const mongoose = require('mongoose');
const {generateOtp} = require("../utils/util-functions");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true, // automatically creates an index
        lowercase: true,
        trim: true
    },
    otp: {
        type: Number,
        required: true
    },
    expiresAt: {
        type: Date,
        index: {
            expires: 0
        }
    }
});

otpSchema.statics.insertOtp = async function (email)  {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const otp = generateOtp();
    return await this.findOneAndUpdate(
        { email }, // finds the document with this email
        { otp, expiresAt }, //
        { new: true, upsert: true }
    );
}

module.exports = mongoose.model('Otp', otpSchema);