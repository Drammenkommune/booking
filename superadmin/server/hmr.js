/* eslint-disable no-magic-numbers,no-process-env */
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./config/webpack.development')
const compiler = webpack(webpackConfig)
const config = require('./config')

const app = express()

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  quiet: false,
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    // poll: true
  },
  stats: {
    colors: false,
  }
}))

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: `${config.path}__webpack_hmr`,
  heartbeat: 3 * 1000
}))

app.use('/superadmin/*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html')
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) return next(err)
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

module.exports = app
