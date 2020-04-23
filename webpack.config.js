const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const buildPath = 'build';

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
        { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
        { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'dist/main.css' }),
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
      server: [path.resolve(__dirname, 'src/main.js')],
    },
    output: {
      path: path.resolve(__dirname, buildPath),
      filename: 'src/server.js',
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      ],
    },
  };

  return [clientConfig, serverConfig];
};
