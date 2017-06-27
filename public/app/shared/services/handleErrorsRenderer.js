import React from 'react'

export default (redirects) => {
  function redirectError(status) {
    const redirect = redirects[status]

    if (redirect) {
      window.location.replace(redirect)
    }
  }

  return function handleErrors({props, element, error}) {
    if ((error && error.source && error.source.errors[0]) && redirects) {
      redirectError(error.source.errors[0].status)
    }

    return props ? React.cloneElement(element, props) : null
  }
}
