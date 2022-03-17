const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware("/images", {target: process.env.REACT_APP_SERVER_URL, changeOrigin: true}));
  app.use(createProxyMiddleware('/translate', {target: process.env.TRANSLATOR_URL}));
};
