const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

const WEBPACK_PORT = 8080;

const start = () => {
  config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${WEBPACK_PORT}/`);
  const compiler = webpack(config);
  const server = new WebpackDevServer(compiler, { lazy: true, filename: 'bundle.js' });
  server.listen(WEBPACK_PORT);
};

module.exports = {
  start,
};
