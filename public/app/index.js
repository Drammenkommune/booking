import React from 'react'
import ReactDOM from 'react-dom'
import Promise from 'bluebird'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Root from './Root'
import {injectNetworkLayer, isLocalStorageSupported} from '@/services'
import HmrContainer from '~/components/HmrContainer'

const isProduction = process.env.NODE_ENV === 'production'
Promise.config({
  cancellation:    true,
  warnings:        !isProduction,
  monitoring:      !isProduction,
  longStackTraces: !isProduction,
})

if (!isLocalStorageSupported()) {
  window.alert(`Denne applikasjonen er ikke støttet i Safari Private mode \
    \nVennligst gå ut av Private Mode for å bruke applikasjonen `)
}

// Needed for Material-UI
// Can go away when react 1.0 release
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

const token = localStorage.getItem('dk_public_token') || sessionStorage.getItem('dk_public_token')
injectNetworkLayer(token, 'dk_public_token', '/#/logg-inn')

const rootEl = document.getElementById('app')
try {
  ReactDOM.render(<HmrContainer><Root/></HmrContainer>, rootEl)
  if (module.hot) {
    module.hot.accept('./Root', () => {
      const NextApp = require('./Root').default; // eslint-disable-line
      ReactDOM.render(<HmrContainer><NextApp /></HmrContainer>, rootEl)
    })
  }
} catch (err) {
  console.log('Render error', err)
  console.error(err.stack)
}
