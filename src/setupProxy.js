const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/images', { target: process.env.REACT_APP_SERVER_URL }));
  app.use(proxy('/translate', { target: process.env.TRANSLATOR_URL }));
};
