const path = require('path')
const webpack = require('webpack')
const config = require('./index')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(config.srcDir, './app'),
  output: {
    path: config.publicPath,
    filename: config.isDevelopment ? '[name].js' : '[name][hash].js',
    publicPath: config.path
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        loader: 'babel!svg-react'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js'],
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(config.envType)
      }
    }),
    new HtmlWebpackPlugin({
      template: 'index.html.ejs'
    })
  ]

}
