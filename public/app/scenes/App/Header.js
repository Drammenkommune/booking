import React from 'react'
import {StyleSheet, css} from 'aphrodite'
import {AppBar} from 'material-ui'

import AppMenu from './AppMenu'
import {BackArrow} from '@/components'
import {HomeIcon} from '@/icons'

const styles = StyleSheet.create({
  header: {
    height: 64,
    display: 'flex',
    overflow: 'hidden',
    zIndex: 1
  }
})

const appBarItemStyle = {
  width: null,
  marginTop: 0,
  display: 'flex',
  alignItems: 'center'
}

const Header = ({location, user}, {router}) => {
  return (
    <AppBar
      id="header-target"
      title={(
        <div tabIndex="0" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <HomeIcon style={{height: 24, width: 27, marginRight: 10}} color="#FFF"/>
          Drammen booking
        </div>
      )}
      titleStyle={{textAlign: 'center', cursor: 'pointer'}}
      className={css(styles.header)}
      onTitleTouchTap={() => router.push('/#/')}
      iconStyleRight={appBarItemStyle}
      iconStyleLeft={appBarItemStyle}
      iconElementLeft={(
        <BackArrow
          location={location}
          defaultLocation="/"
          hiddenLocations={['/', '/kvittering', '/ikke-funnet', '/logg-inn']}/>
      )}
      iconElementRight={<AppMenu loggedIn={!!(user && user.id && user.name)}/>}/>
  )
}

Header.propTypes = {
  location: React.PropTypes.object.isRequired,
  user: React.PropTypes.object
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Header
