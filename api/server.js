const app = require('../app');
const environmentConfig = require('../config/environment-config');
const mongoose = require("mongoose");

mongoose.connect(environmentConfig.mongodbURI)
    .then((client) => {
        app.listen(environmentConfig.port);
        console.log(`Server listening on port ${environmentConfig.port}. Environment is ${environmentConfig.nodeEnv}`);
    })
    .catch((error) => {
        console.log(error);
    })