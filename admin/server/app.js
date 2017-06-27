/* eslint-disable no-magic-numbers,no-process-env */
const path = require('path')
const express = require('express')
const compression = require('compression')
const isDevelopment = require('./config').isDevelopment
const config = require('./config')

// Cache expiry (24 hours)
const maxAge = 1000 * 60 * 60 * 24

const app = express()

// gzip assets
app.use(compression())

// Serve anything in /public folder as static assets
app.use(config.path, express.static(path.join(config.runDir, 'server', 'public'), {maxAge, index: false}))

if (isDevelopment) {
  // Enable hot module reloading for development
  app.use(require('./hmr'))
} else {
  app.get('/admin/*', (req, res) => {
    res.set('Cache-Control', 'no-cache')
    res.sendFile(path.join(config.publicPath, 'index.html'))
  })
}

module.exports = app
