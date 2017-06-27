import Relay from 'react-relay'
import NetworkLayer from './networkLayer'

export default (token, tokenKey, redirect) => {
  const headers = {}

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const networkLayer = new NetworkLayer('/graphql', {
    headers,
    onUnauthorized: _ => {
      localStorage.removeItem(tokenKey)
      sessionStorage.removeItem(tokenKey)
      if (redirect) {
        window.location.href = redirect
        window.location.reload()
      }
    }
  })

  Relay.injectNetworkLayer(networkLayer)
}
