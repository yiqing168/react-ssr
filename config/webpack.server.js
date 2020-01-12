var nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "../src/client/serverApp.js"),
  target: "node",
  node: {
    __filename: true,
    __dirname: true
  },
  //  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "server.js",
    libraryTarget: "commonjs2"
  },
  resolve: {
    alias: {
      // 使用别名 简写
      "@": path.resolve(__dirname, "../src")
    }
  },
  // loader配置
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        // 排除node_modules 目录下的文件
        exclude: /node_modules/
      }
    ]
  }
};
