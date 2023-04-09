// webpack.client.js
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const timestamp = Date.now().toString();

module.exports = {
  cache: true,
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./dist/client"),
    publicPath: '/client',
    filename: "index.js",
  },
  module: {
    rules: [
        {
          test: /\.(tsx|jsx|ts|js)$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
            compilerOptions: {
              module: 'es2015',
            },
          },
        },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/tpl/index.html',
      inject: true,
      timestamp,
    }),
    new webpack.DefinePlugin({
      'process.env.SSR': JSON.stringify('client')
    })
  ],
  resolve: {
    alias:{
      '@': path.join(__dirname, './src'),
    },
    extensions: [".jsx", ".js", ".tsx", ".ts"],
  },
};