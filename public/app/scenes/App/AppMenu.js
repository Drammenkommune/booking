import React from 'react'
import {MenuItem} from 'material-ui'

import {AppMenu} from '@/components'
import {injectNetworkLayer} from '@/services'

const menuItemStyle = {
  fontWeight: '500'
}

const AppMenuContainer = ({loggedIn}, {router}) => {
  return (
    <AppMenu anchorId="header-target">
      <MenuItem
        primaryText={<h3 style={menuItemStyle}>{loggedIn ? 'Mine bookinger' : 'Forside'}</h3>}
        onTouchTap={() => { router.push('/') }}/>
      {loggedIn && (
        <MenuItem
          style={{borderTop: '1px solid rgba(0, 0, 0, 0.3)'}}
          primaryText={<h3 style={menuItemStyle}>Min profil</h3>}
          onTouchTap={() => { router.push('/profil') }}/>
      )}
      <MenuItem
        style={{borderTop: '1px solid rgba(0, 0, 0, 0.3)'}}
        primaryText={<h3 style={menuItemStyle}>Om tjenesten</h3>}
        onTouchTap={() => { router.push('/om-tjenesten') }}/>
      <MenuItem
        style={{borderTop: '1px solid rgba(0, 0, 0, 0.3)'}}
        primaryText={<h3 style={menuItemStyle}>Vilkår</h3>}
        onTouchTap={() => { router.push('/vilkar') }}/>
      {loggedIn && (
        <MenuItem
          style={{borderTop: '1px solid rgba(0, 0, 0, 0.3)'}}
          primaryText={<h3 style={menuItemStyle}>Logg ut</h3>}
          onTouchTap={() => {
            const token = localStorage.getItem('dk_public_token') || sessionStorage.getItem('dk_public_token')
            localStorage.removeItem('dk_public_token')
            sessionStorage.removeItem('dk_public_token')
            injectNetworkLayer(null, null, '/#/logg-inn')
            window.location.replace(`/auth/logout?token=${token}`)
          }}/>
      )}
    </AppMenu>
  )
}

AppMenuContainer.propTypes = {
  loggedIn: React.PropTypes.bool
}

AppMenuContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default AppMenuContainer
