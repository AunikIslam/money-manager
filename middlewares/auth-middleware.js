const jwt = require('jsonwebtoken');
const ApiResponse = require('../models/api-response')

exports.verifyToken = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json(new ApiResponse.Error(['Authorization header not available'], 401));
    }
    const token = header.split(' ')[1];
    if (!token) {
        return res.status(401).json(new ApiResponse.Error(['Token not available'], 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json(new ApiResponse.Error(['Token expired'], 401));
        } else {
            return res.status(401).json(new ApiResponse.Error(['Invalid token'], 401));
        }
    }
}