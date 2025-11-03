const app = require('./app');
const environmentConfig = require('./config/environment-config');
const connectDB = require('./utils/database-connection');

connectDB.connectDB()
    .then(() => {
        app.listen(environmentConfig.port);
    })