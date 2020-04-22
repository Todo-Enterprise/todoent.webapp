const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({ filename: 'dist/main.css' });

module.exports = (env, argv) => {
  const buildPath = 'build';
  const serverMainFilename = 'main.js';

  const clientConfig = {
    mode: argv.mode,
    entry: {
      client: [path.resolve(__dirname, 'public/scripts/scripts.js'), '@babel/polyfill'],
    },
    output: {
      path: path.resolve(__dirname, `${buildPath}`),
      filename: 'dist/bundle.js',
      publicPath: '/dist',
    },
    module: {
      rules: [
        { test: /\.scss$/, use: extractPlugin.extract({ use: ['css-loader', 'sass-loader'] }) },
        { test: /\.css$/, use: extractPlugin.extract({ use: ['css-loader'] }) },
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      ],
    },
    plugins: [
      extractPlugin,
      new CopyWebpackPlugin([
        { from: 'public/templates', to: 'dist/templates' },
        { from: '.env', to: './' },
      ]),
    ],
  };

  const serverConfig = {
    mode: argv.mode,
    target: 'node',
    entry: {
      server: [path.resolve(__dirname, `src/${serverMainFilename}`)],
    },
    output: {
      path: path.resolve(__dirname, buildPath),
      filename: 'src/server.js',
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      ],
    },
  };

  return [clientConfig, serverConfig];
};
