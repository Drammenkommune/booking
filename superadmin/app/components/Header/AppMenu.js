import React from 'react'
import {MenuItem} from 'material-ui'

import {AppMenu} from '@/components'
import {injectNetworkLayer} from '@/services'

const menuItemStyle = {
  fontWeight: '500'
}

const borderTop = {
  borderTop: '1px solid rgba(0, 0, 0, 0.3)'
}

const AppMenuContainer = (_, {router}) => {
  return (
    <AppMenu anchorId="header-target">
      <MenuItem
        primaryText={<h3 style={menuItemStyle}>Forside</h3>}
        onTouchTap={() => { router.push('/') }}/>
      <MenuItem
        style={borderTop}
        primaryText={<h3 style={menuItemStyle}>Bookingstidsperiode</h3>}
        onTouchTap={() => { router.push('/bookingstidsperiode') }}/>
      <MenuItem
        style={borderTop}
        primaryText={<h3 style={menuItemStyle}>Om tjenesten</h3>}
        onTouchTap={() => { router.push('/om-tjenesten') }}/>
      <MenuItem
        style={borderTop}
        primaryText={<h3 style={menuItemStyle}>Vilkår</h3>}
        onTouchTap={() => { router.push('/vilkar') }}/>
      <MenuItem
        style={borderTop}
        primaryText={<h3 style={menuItemStyle}>Rapporter/Statistikk</h3>}
        onTouchTap={() => { router.push('/statistikk') }}/>
      <MenuItem
        style={borderTop}
        primaryText={<h3 style={menuItemStyle}>Logg ut</h3>}
        onTouchTap={() => {
          localStorage.removeItem('dk_superadmin_token')
          injectNetworkLayer(null, null, '/superadmin/#/logg-inn')
          router.push('/logg-inn')
        }}/>
    </AppMenu>
  )
}

AppMenuContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default AppMenuContainer
