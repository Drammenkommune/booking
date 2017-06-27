const webpackCommon = require('./webpack.common')
const webpack = require('webpack')

const webpackConfig = Object.assign({}, webpackCommon, {
  // devtool: 'cheap-module-source-map',
  entry: {
    app: [
      'babel-polyfill',
      'whatwg-fetch',
      './index.js'
    ]
  }
})

webpackConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({minify: true})
)

module.exports = webpackConfig
