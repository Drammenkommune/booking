import React from 'react'
import ReactDOM from 'react-dom'
import {SnackBar} from '~/components'

const TIMEOUT = 150

export default function snackbar(message, options = {}) {
  const wrapper = document.body.appendChild(document.createElement('div'))

  const opts = Object.assign({autoHideDuration: 10000}, options)
  function dispose() {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(wrapper)
      setTimeout(() => wrapper.remove())
    }, TIMEOUT)
  }

  ReactDOM.render(<SnackBar {...opts} dispose={dispose} message={message}/>, wrapper)
}
