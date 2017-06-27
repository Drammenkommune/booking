import React from 'react'
import {css} from 'aphrodite'
import {IconButton} from 'material-ui'
import ClearIcon from 'material-ui/svg-icons/content/clear'

import styles from '../styles'
import {theme} from '@/services'
import {OverlayTitle} from '@/components'

const Header = ({onHandleClose}) => {
  const action = (
    <IconButton
      aria-label="Lukk tidvelger"
      style={{marginBottom: -12, marginRight: -12}}
      onTouchTap={onHandleClose}>
      <ClearIcon />
    </IconButton>
  )
  return (
    <div className={css(styles.header)}>
      <div style={{margin: -16, marginBottom: 16}}>
        <OverlayTitle
          title="Bekreft valgt tid"
          action={action}
          dividerColor={theme.bookingColor}/>
      </div>
    </div>
  )
}

Header.propTypes = {
  onHandleClose: React.PropTypes.func.isRequired
}

export default Header
