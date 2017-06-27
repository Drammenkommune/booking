import Relay from 'react-relay'

const STATUS_UNAUTHORIZED = 401

export default class MyNetworkLayer extends Relay.DefaultNetworkLayer {
  _sendQuery(request) {
    return super._sendQuery(request)
      .catch(err => {
        if (err.response.status === STATUS_UNAUTHORIZED) {
          return this._init.onUnauthorized()
        }
      })
  }
}
