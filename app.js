const express = require("express");
const cors = require('cors');
const path = require("path");
const endpoints = require('./config/endpoints');
const baseUrls = require('./config/base-urls');
const utilFunctions = require('./utils/util-functions')
const axios = require("axios");
const app = express();
const templateRoutes = require('./routes/template-routes');
const pdfExportRoutes = require('./routes/pdf-export-routes')
const baseService = require('./services/base-service');
const sessionContextService = require('./services/session-context-service');
const setupSwagger = require('./config/swagger-config');
const checkForWhiteListUrl = require('./utils/white-list-urls');
const ApiResponse = require("./models/api-response");
const browserPool = require('./config/browser-pool');
const authRoutes = require('./routes/auth-routes');
const authMiddleware = require('./middlewares/auth-middleware');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use((req, res, next) => {
    sessionContextService.initialize({}, () => {
        next();
    })
});
app.use('/auth', authRoutes);
app.use('/other-routers', authMiddleware.verifyToken);

setupSwagger(app);

module.exports = app;
