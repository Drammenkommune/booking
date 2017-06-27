import React from 'react'
import {css, StyleSheet} from 'aphrodite'

import {dayNames} from './constants'
import {isDayBooked, isDayUnavailable} from './helpers'
import ActionLink from '@/components/ActionLink'

const styles = StyleSheet.create({
  container:  {
    display: 'flex',
    width: 'auto',
    marginTop: 10,
    justifyContent: 'flex-start',
    paddingLeft: 75,
    marginLeft: '-16px',
    marginRight: '-16px',
    '@media (min-width: 760px)': {
      paddingLeft: 95
    }
  },
  day: {
    flexGrow: '1',
    margin: 0,
    textAlign: 'left',
    '@media (min-width: 760px)': {
      width: 44
    }
  }
})

const WeekDays = ({onHandleSelectDay, week, events, unavailableDates, semester}) => {
  return (
    <div className={css(styles.container)}>
      {week.map((day, index) => {
        const booked = isDayBooked(day, events) || isDayUnavailable(day, unavailableDates, semester)
        return booked
          ? (<p className={css(styles.day)} key={index}>{dayNames[index]}</p>)
          : (
            <ActionLink
              key={index}
              className={css(styles.day)}
              onTouchTap={() => onHandleSelectDay(day)}>
              {dayNames[index]}
            </ActionLink>
          )
      })}
    </div>
  )
}

WeekDays.propTypes = {
  onHandleSelectDay: React.PropTypes.func.isRequired,
  week: React.PropTypes.array.isRequired,
  events: React.PropTypes.array.isRequired,
  unavailableDates: React.PropTypes.array.isRequired,
  semester: React.PropTypes.object
}

export default WeekDays
