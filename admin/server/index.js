const http = require('http')
const app = require('./app')
const port = require('./config').port

const server = http.createServer(app)
server.listen(port, function(err) {
  if (err) console.error(err)
  console.info('App listening on', port)
})
