const jwt = require('jsonwebtoken');

exports.generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN});
}

exports.generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN});
}