const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const serverConfig = {
  mode: 'development',
  target: 'node',
  entry: {
    server: [path.resolve(__dirname, 'src/main.js')],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'src/[name].js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'public', to: 'public' },
    ]),
  ],
};

module.exports = [serverConfig];
