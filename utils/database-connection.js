const mongoose = require('mongoose');
const environmentConfig = require('../config/environment-config');

let isConnected = false;

exports.connectDB = async () => {
    if (isConnected) {
        return;
    }
    try {
        await mongoose.connect(environmentConfig.mongodbURI);
        isConnected = true;
        console.log(`Server listening on port ${environmentConfig.port}. Environment is ${environmentConfig.nodeEnv}`);
    } catch (error) {
        console.log(error);
    }
}

