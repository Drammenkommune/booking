import React from 'react'
import {MenuItem} from 'material-ui'

import {AppMenu} from '@/components'
import {injectNetworkLayer} from '@/services'
import {BurgerIcon} from '@/icons'

const menuItemStyle = {
  fontWeight: '500'
}

const borderTop = {
  borderTop: '1px solid rgba(0, 0, 0, 0.3)'
}

const AppMenuContainer = (_, {router}) => {
  return (
    <AppMenu anchorId="header-target" icon={(<BurgerIcon />)}>
      <MenuItem
        primaryText={<h3 style={menuItemStyle}>Forside</h3>}
        onTouchTap={() => { router.push('/') }}/>
      <MenuItem
        style={borderTop}
        primaryText={<h3 style={menuItemStyle}>Utilgjengelige datoer</h3>}
        onTouchTap={() => { router.push('/utilgjengelige') }}/>
      <MenuItem
        style={borderTop}
        primaryText={<h3 style={menuItemStyle}>Kontaktinfo</h3>}
        onTouchTap={() => { router.push('/kontaktinfo') }}/>
      <MenuItem
        style={borderTop}
        primaryText={<h3 style={menuItemStyle}>Logg ut</h3>}
        onTouchTap={() => {
          localStorage.removeItem('dk_admin_token')
          injectNetworkLayer(null, null, '/admin/#/logg-inn')
          router.push('/logg-inn')
        }}/>
    </AppMenu>
  )
}

AppMenuContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default AppMenuContainer
