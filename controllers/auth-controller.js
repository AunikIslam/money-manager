const userOtpImpl = require('../repositories/auth/impl/user-otp-impl');
const userEmailImpl = require('../repositories/auth/impl/user-email-impl');
const ApiResponse = require("../models/api-response");
const User = require('../schemas/user');


exports.insertAndSendOtp = async (req,res) => {
    const duplicateUser = await User.findOne({email: req.body.email.toLowerCase()});
    if (duplicateUser) {
        return res.status(400).json(new ApiResponse.Error(['User already exists'], 400));
    }
    try {
        const response  = await userOtpImpl.insertOtp(req.body.email);
        await userEmailImpl.sendSignUpOtpEmail(response.email.toLowerCase(), response.otp);
        return res.status(200).json(new ApiResponse.Success('An otp has been sent to your email address.'));
    }
    catch (err) {

    }
}

exports.verifyOtp = async (req,res) => {
    try {
        const {email, password, otp} = req.body;
        await userOtpImpl.verifyOtp({email, password, otp});
        return res.status(200).json(new ApiResponse.Success('User created successfully.'));

    } catch (error) {
        return res.status(400).json(new ApiResponse.Error([error.message], 400));
    }
}

exports.login = async (req,res) => {
    try {

    } catch (error) {

    }
}