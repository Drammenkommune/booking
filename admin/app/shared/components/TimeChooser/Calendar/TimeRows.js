import React from 'react'
import {css, StyleSheet} from 'aphrodite'

import {
  isHourBooked, isHourClosed,
  isTimeSelected, momentTime,
  isDayUnavailable
} from './helpers'
import {hours, defaultOpenedHours} from './constants'
import Hour from './Hour'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hoursContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    width: '100%'
  },
  hourContainer: {
    position: 'relative',
    flexGrow: 0,
    flexShrink: 0,
    padding: '0 10px',
    width: 75,
    '@media (min-width: 760px)': {
      width: 95
    }
  },
  hour: {
    textAlign: 'center',
    margin: 0,
    height: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  hourWrapper: {
    flexGrow: '1'
  }
})

const TimeRows = ({week, events, unavailableDates, onHandleTimeClick, selectedTimes, semester, adminMode}) => {
  const unavailableDays = week.map(day => isDayUnavailable(day, unavailableDates, semester))
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.hoursContainer)}>
        <div className={css(styles.hourContainer)}>
          {hours.map(hour => (<p key={hour} className={css(styles.hour)}>{hour}</p>))}
        </div>
        {week.map((day, index) => (
          <div key={index} className={css(styles.hourWrapper)}>
            {hours.map(hour => (
              <Hour
                key={hour}
                hour={hour}
                day={day}
                adminMode={adminMode}
                onClickHandler={() => {
                  onHandleTimeClick(momentTime(day, hour))
                }}
                selected={isTimeSelected(day, hour, selectedTimes)}
                busy={isHourBooked(day, hour, events)}
                unavailable={unavailableDays[index] || isHourClosed(day, hour, defaultOpenedHours)}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}


TimeRows.propTypes = {
  week: React.PropTypes.array.isRequired,
  events: React.PropTypes.array.isRequired,
  unavailableDates: React.PropTypes.array.isRequired,
  onHandleTimeClick: React.PropTypes.func.isRequired,
  selectedTimes: React.PropTypes.array.isRequired,
  semester: React.PropTypes.object,
  adminMode: React.PropTypes.bool,
}

export default TimeRows
