const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 路径设置
const configPath = {
  entryPath: path.resolve(__dirname, "../src/client/index.js"),
  outputPath: path.resolve(__dirname, "../dist")
}

/**
 * wwebapck 公共配置
 */
module.exports = function (webpackEnv) {
  //环境区分
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  // 处理css 
  const getStyleLoaders = (cssOptions, isLess) => {
    return [
      isEnvProduction ? {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../',
        },
      } : 'style-loader',
      {
        loader: 'css-loader',
        options: cssOptions,
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.resolve(__dirname, "../postcss.config.js"),
          }
        }
      },
      isLess && "less-loader"
    ].filter(Boolean);
  };
  return {
    mode: isEnvProduction ? 'production' : 'development',
    entry: {
      index: configPath.entryPath
    },
    output: {
      path: configPath.outputPath,
      publicPath: "/public/",
      // 生产环境配置 contenthash 
      filename: isEnvProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
      chunkFilename: isEnvProduction ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
    },
    resolve: {
      alias: {
        // 使用别名 简写
        '@': path.resolve(__dirname, "../src")
      }
    },
    // 开发环境使用devtool  生产环境为了不影响打包速度 去除
    devtool: isEnvDevelopment ? 'cheap-module-source-map' : undefined,
    // loader配置 
    module: {
      rules: [
        {
          test: /\.(jpg|png|gif|jpeg)/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10240,
                name: 'static/image/[name].[hash:8].[ext]',
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'static/file/[name].[hash:8].[ext]',
              }
            }
          ]
        },
        {
          test: /\.css/,
          use: getStyleLoaders({
            importLoaders: 1
          })
        },
        {
          test: /\.less/,
          use: getStyleLoaders({
            importLoaders: 2
          }, true)
        },
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          //排除node_modules 目录下的文件
          exclude: /node_modules/
        },
      ]
    },
    // 插件配置
    plugins: [
      // 清除目录
      // new CleanWebpackPlugin({
      //   cleanOnceBeforeBuildPatterns: [
      //     path.resolve(__dirname, '../client'),
      //   ]
      // }),
      new HtmlWebpackPlugin(
        Object.assign({}, {
          title: "首页",
          inject: 'body',
          template: path.resolve(__dirname, "../src/client/index.html")
        },
          // 生产优化
          isEnvProduction ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          } : undefined
        )
      ),
      isEnvProduction && new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      })
    ].filter(Boolean)
  }
}