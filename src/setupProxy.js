const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });
};
