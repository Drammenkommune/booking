import React from 'react'
import {css} from 'aphrodite'

import styles from '../styles'
import Header from './Header'
import Day from './Day'
import Actions from './Actions'

const EventSelection = ({
  selectedDays, onHandleClose,
  onCancelEventClick, recurringBookings,
  onAdvanceClick, onBackClick
}) => {
  return (
    <div className={css(styles.wrapper)}>
      <Header onHandleClose={onHandleClose}/>
      <div style={{
        flexGrow: 1,
        width: '100%',
        maxHeight: 550,
        height: '100%',
        overflowY: 'scroll',
      }}>
        {selectedDays.map((day, index) => (
          <Day
            key={index}
            eventDay={day}
            recurring={recurringBookings && recurringBookings.length > 0}
            onCancelEventClick={onCancelEventClick}/>
        ))}
      </div>
      <Actions
        onAdvanceClick={onAdvanceClick}
        onBackClick={onBackClick}
        onHandleClose={onHandleClose}/>
    </div>
  )
}

EventSelection.propTypes = {
  selectedDays: React.PropTypes.array,
  onHandleClose: React.PropTypes.func.isRequired,
  onCancelEventClick: React.PropTypes.func.isRequired,
  onAdvanceClick: React.PropTypes.func.isRequired,
  onBackClick: React.PropTypes.func.isRequired,
  recurringBookings: React.PropTypes.array,
}

export default EventSelection
