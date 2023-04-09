// webpack.server.js
const path = require("path");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  mode: "production",
  target: "node",
  entry: "./src/index.ssr.tsx",
  output: {
    path: path.resolve(__dirname, "./dist/server"),
    publicPath: '/server',
    filename: "bundle.js",
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
  externals: [nodeExternals()],
  plugins: [],
  resolve: {
    alias:{
      '@': path.join(__dirname, './src'),
    },
    extensions: [".jsx", ".js", ".tsx", ".ts"],
  },
};