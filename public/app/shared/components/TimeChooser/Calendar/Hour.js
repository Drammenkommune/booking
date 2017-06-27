import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import CheckIcon from 'material-ui/svg-icons/navigation/check'
import {theme} from '@/services'

const styles = StyleSheet.create({
  hour: {
    width: 24,
    height: 24,
    padding: 0,
    marginTop: 16,
    marginRight: 9,
    borderRadius: 2,
    border: 'none',
    backgroundColor: theme.timeChooser.open,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (min-width: 760px)': {
      marginRight: 5,
    }
  },
  busy: {
    backgroundColor: theme.timeChooser.busy,
  },
  unavailable: {
    opacity: 0.54,
    backgroundColor: theme.timeChooser.unavailable
  },
  notAllowed: {
    cursor: 'not-allowed'
  }
})

const Hour = ({hour, day, selected, busy, unavailable, onClickHandler, adminMode}) => {
  const onKeyPressHandler = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClickHandler()
    }
  }

  const disabled = (busy || (!adminMode && unavailable))
  const ariaLabel = hour && day
    ? `${day.format('dddd DD.MM.YYYY')} klokken ${hour} ${selected ? 'Valgt' : 'Ikke valgt'}`
    : null

  return (
    <button
      className={css(
        styles.hour,
        busy || unavailable ? styles.busy : null,
        unavailable && !(adminMode && busy) ? styles.unavailable : null,
        disabled ? styles.notAllowed : null
      )}
      aria-label={ariaLabel}
      onKeyPress={disabled ? null : onKeyPressHandler}
      onTouchTap={disabled ? null : onClickHandler}
      disabled={disabled}
      tabIndex={!onClickHandler || unavailable || busy ? -1 : null}>
      {selected ? <CheckIcon color={unavailable ? 'white' : 'black'}/> : null}
    </button>
  )
}

Hour.propTypes = {
  hour: React.PropTypes.string,
  day: React.PropTypes.object,
  selected: React.PropTypes.bool,
  busy: React.PropTypes.bool,
  adminMode: React.PropTypes.bool,
  unavailable: React.PropTypes.bool,
  onClickHandler: React.PropTypes.func
}

export default Hour
