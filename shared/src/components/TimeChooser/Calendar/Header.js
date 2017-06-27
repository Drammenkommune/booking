import React from 'react'
import {IconButton} from 'material-ui'
import ClearIcon from 'material-ui/svg-icons/content/clear'

import OverlayTitle from '@/components/OverlayTitle'
import {theme} from '@/services'

const Header = ({onHandleClose}) => {
  const action = (
    <IconButton
      aria-label="Lukk tidsvelger"
      style={{marginBottom: -12, marginRight: -12}}
      onTouchTap={onHandleClose}>
      <ClearIcon />
    </IconButton>
  )

  return (
    <OverlayTitle
      title="Velg tidspunkt"
      action={action}
      dividerColor={theme.bookingColor}/>
  )
}

Header.propTypes = {
  room: React.PropTypes.object.isRequired,
  onHandleClose: React.PropTypes.func.isRequired,
}

export default Header
