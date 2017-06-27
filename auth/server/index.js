import app from './app'
import config from '~/config'

app.listen(config.port, () => console.log(
  `Auth Server is now listening on ${config.port}`
))
