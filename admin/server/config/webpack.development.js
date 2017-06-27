const config = require('./index')
const webpackCommon = require('./webpack.common')
const webpack = require('webpack')

const webpackConfig = Object.assign({}, webpackCommon, {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      'babel-polyfill',
      'whatwg-fetch',
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?path=${config.path}__webpack_hmr`,
      './index.js',
    ]
  }
})

webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.SourceMapDevToolPlugin()
)

module.exports = webpackConfig
