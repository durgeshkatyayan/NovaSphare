const path = require('path');
const dotenv = require('dotenv');
const config = require('./webpack.config');

dotenv.config({ path: path.resolve(__dirname, '../../server/.env') });

const backendPort = process.env.PORT || '3101';

config.devServer = {
  historyApiFallback: true,
  static: false,
  port: 8083,
  proxy: {
    '/api': {
      target: `http://localhost:${backendPort}`,
      secure: false,
      changeOrigin: true,
    },
  },
};

module.exports = config;
