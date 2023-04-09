// webpack.client.js
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const timestamp = Date.now().toString();

module.exports = {
  cache: true,
  mode: "development",
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
  ],
  resolve: {
    alias:{
      '@': path.join(__dirname, './src'),
    },
    extensions: [".jsx", ".js", ".tsx", ".ts"],
  },
};