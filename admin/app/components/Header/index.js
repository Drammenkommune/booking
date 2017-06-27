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

const Header = ({location, viewer}, {router}) => {
  const loggedIn = viewer && viewer.name
  const headerConfig = loggedIn
    ? {
      iconElementLeft: (
        <BackArrow
          location={location}
          locationPrefix="/admin"
          defaultLocation="/"
          hiddenLocations={['/', '/kvittering', '/ikke-funnet']}/>
      ),
      iconStyleLeft: appBarItemStyle,
      iconStyleRight: appBarItemStyle,
      iconElementRight: (<AppMenu />),
      title: title(viewer.name),
      onTitleTouchTap: () => router.push('/'),
      titleStyle: {cursor: 'pointer', textAlign: 'center'},
      className: css(styles.header)
    }
    : {
      title: title('Drammen booking'),
      titleStyle: {textAlign: 'center'},
      showMenuIconButton: false,
      className: css(styles.header)
    }

  return (
    <AppBar id="header-target" {...headerConfig}/>
  )
}

Header.propTypes = {
  location: React.PropTypes.object,
  viewer: React.PropTypes.object,
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Header
