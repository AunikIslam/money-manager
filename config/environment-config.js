const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
});

module.exports = {
    port: process.env.PORT,
    dbName: process.env.DB_NAME,
    nodeEnv: process.env.NODE_ENV,
    dbHost: process.env.DB_HOST,
    mongodbURI: process.env.MONGODB_URI,
};
