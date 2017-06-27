import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import {FlatButton} from 'material-ui'

import ChevronLeftIcon from '@/icons/ChevronLeftIcon'
import {previousLocation} from '@/services/useWaypoint'

const styles = StyleSheet.create({
  backArrowText: {
    color: 'white',
    fontSize: 18,
    '@media (max-width: 550px)': {
      display: 'none'
    }
  }
})

const shouldArrowShow = (currentLocation, hiddenLocations) => {
  return hiddenLocations.findIndex(location => location === currentLocation) < 0
}

const BackArrow = ({location, defaultLocation, hiddenLocations, locationPrefix}) => {
  const shouldShow = shouldArrowShow(location.pathname, hiddenLocations)
  const style = {
    pointerEvents: shouldShow ? 'all' : 'none',
    marginRight: 0,
    padding: '0 10px',
    minWidth: 0
  }

  const goBack = () => {
    const back = previousLocation() || defaultLocation
    window.location.replace(`${locationPrefix || ''}/#${back}`)
  }

  return (
    <FlatButton tabIndex={shouldShow ? 0 : -1} onTouchTap={goBack} style={style} aria-label="Tilbake">
      <div style={{display: 'flex', alignItems: 'center', opacity: shouldShow ? 1 : 0}}>
        <div style={{overflow: 'hidden', height: 24}}>
          <ChevronLeftIcon style={{height: 40, width: 25}} />
        </div>
        <span className={css(styles.backArrowText)}>Tilbake</span>
      </div>
    </FlatButton>
  )
}

BackArrow.propTypes = {
  location: React.PropTypes.object.isRequired,
  defaultLocation: React.PropTypes.string.isRequired,
  hiddenLocations: React.PropTypes.array,
  locationPrefix: React.PropTypes.string,
}

export default BackArrow
