import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import {AppBar} from 'material-ui'

import AppMenu from './AppMenu'
import {BackArrow} from '@/components'
import {HomeIcon} from '@/icons'

const styles = StyleSheet.create({
  header: {
    height: 64,
    display: 'flex',
    overflow: 'hidden'
  }
})

const appBarItemStyle = {
  width: null,
  marginTop: 0,
  display: 'flex',
  alignItems: 'center'
}

const title = (text) => (
  <div tabIndex="0" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <HomeIcon style={{height: 24, width: 27, marginRight: 10}} color="#FFF"/>
    {text}
  </div>
)


const Header = ({location, admin}, {router}) => {
  const loggedIn = admin && admin.email
  const headerConfig = loggedIn
    ? {
      iconElementLeft: (
        <BackArrow
          location={location}
          locationPrefix="/superadmin"
          defaultLocation="/"
          hiddenLocations={['/']}/>
      ),
      iconElementRight: (<AppMenu />),
      iconStyleLeft: appBarItemStyle,
      iconStyleRight: appBarItemStyle,
      title: title('Superadmin'),
      onTitleTouchTap: () => router.push('/'),
      titleStyle: {cursor: 'pointer', textAlign: 'center'},
      className: css(styles.header)
    }
    : {
      title: title('Superadmin'),
      titleStyle: {textAlign: 'center'},
      iconStyleLeft: appBarItemStyle,
      iconStyleRight: appBarItemStyle,
      showMenuIconButton: false,
      className: css(styles.header)
    }

  return (
    <AppBar id="header-target" {...headerConfig}/>
  )
}

Header.propTypes = {
  location: React.PropTypes.object,
  admin: React.PropTypes.object,
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Header
