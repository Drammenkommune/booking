import React from 'react'
import ReactDOM from 'react-dom'
import Promise from 'bluebird'
import Root from './Root'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {injectNetworkLayer} from '@/services'
import HmrContainer from '~/components/HmrContainer'

const isProduction = process.env.NODE_ENV === 'production'
Promise.config({
  cancellation:    true,
  warnings:        !isProduction,
  monitoring:      !isProduction,
  longStackTraces: !isProduction,
})

// Needed for Material-UI
// Can go away when react 1.0 release
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

injectNetworkLayer(localStorage.getItem('dk_superadmin_token'), 'dk_superadmin_token', '/superadmin/#/logg-inn')

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
