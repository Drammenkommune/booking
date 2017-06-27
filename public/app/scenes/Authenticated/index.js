import React from 'react'

import AddNameToUserMutation from './mutations/AddNameToUserMutation'
import {injectNetworkLayer} from '@/services'
import {mutate} from '~/services'

const Authenticated = ({location}) => {
  const token = location.query.token
  const noName = location.query.noname
  const redirect = sessionStorage.getItem('authenticatedRedirect')
  const storage = sessionStorage.getItem('dk_public_remember_session')
    ? localStorage
    : sessionStorage

  // Clear storage
  sessionStorage.removeItem('dk_public_remember_session')
  sessionStorage.removeItem('authenticatedRedirect')
  localStorage.removeItem('dk_public_token')
  sessionStorage.removeItem('dk_public_token')

  const redirectUser = () => {
    storage.setItem('dk_public_token', token)
    injectNetworkLayer(token, 'dk_public_token', '/#/logg-inn')
    window.location.replace(redirect || '/#/')
  }

  if (token && !noName) {
    redirectUser(token, storage)
  } else if (token && noName) {
    const name = window.prompt('Vennligst oppgi navnet ditt')
    const mutation = new AddNameToUserMutation({name, token})
    mutate(mutation).then(redirectUser)
  } else {
    window.location.replace('/#/logg-inn')
  }

  return null
}

Authenticated.propTypes = {
  location: React.PropTypes.object.isRequired
}

export default Authenticated
