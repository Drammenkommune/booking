import React from 'react'

if (!window.fetch) {
  window.fetch = require('whatwg-fetch')
}

/* eslint-disable no-magic-numbers */
export default function autoReload(Component, url = '/') {
  const tryDelay = 5 * 60 * 1000 // 5 minutes

  class AutoReload extends React.Component {

    constructor(props) {
      super(props)
      this.previousHash = null
      this.state = {
        updateAvailable: false
      }
      this.fetchSource = ::this.fetchSource
      this.compareHash = ::this.compareHash
      this.hash = ::this.hash
    }

    componentDidMount() {
      this.fetchSource()
      this.interval = setInterval(this.fetchSource, tryDelay)
    }

    componentWillUnmount() {
      clearInterval(this.interval)
    }

    fetchSource() {
      return window.fetch(url)
        .then(res => {
          if (res.status !== 200 && res.status !== 304) {
            console.log('Unable to determine if there is a new version available')
          } else {
            return res.text()
          }
        })
        .then(this.compareHash)
    }

    compareHash(html) {
      const hash = this.hash(html)
      if (!hash) {
        return
      }
      if (!this.previousHash) {
        this.previousHash = hash
        return
      }
      if (this.previousHash !== hash) {
        this.previousHash = hash
        console.info(`New version available: ${hash}`)
        this.setState({ updateAvailable: true })
      }
    }

    hash(string = '') {
      const len = string.length
      let hash = 0
      if (len === 0) return null
      let i
      for (i = 0; i < len; i++) {
        hash = ((hash << 5) - hash) + string.charCodeAt(i)
        hash |= 0 // Convert to 32bit integer
      }
      return hash
    }

    render() {
      return (
        <Component {...this.props} updateAvailable={this.state.updateAvailable} />
      )
    }

  }

  return AutoReload
}
