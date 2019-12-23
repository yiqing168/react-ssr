
const path = require("path");
const webpack = require('webpack');
const merge = require("webpack-merge");
const commConfig = require("./webpack.comm.js");
const host = '0.0.0.0';

let devConfig = {
  entry: {
    index: [
      'react-hot-loader/patch',
      path.resolve(__dirname, "../src/client/index.js")
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "../client"),
    hot: true,
    host,
    port: 3000,
    compress: true,
    publicPath: "/public",
    overlay: {
      errors: true
    },
    historyApiFallback: {
      index: '/public/index.html'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}

module.exports = merge(commConfig("development"), devConfig);