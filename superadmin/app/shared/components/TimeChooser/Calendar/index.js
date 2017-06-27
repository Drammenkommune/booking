import React from 'react'
import moment from 'moment'
import {css} from 'aphrodite'

import {ActionLink, CenterContent, PaddedButton} from '@/components'
import theme from '@/services/theme'

import Header from './Header'
import HourLegend from './HourLegend'
import TimeRows from './TimeRows'
import RecurringBooking from './RecurringBooking'
import WeekNavigator from './WeekNavigator'
import WeekDays from './WeekDays'

import {
  startAndEndSelection, openingHours, isHourBooked, getRecurringDays,
  getHoursInBetween, getSelectedDays, getStartAndEndPerDay
} from './helpers'
import {defaultWeek, defaultOpenedHours} from './constants'
import styles from '../styles'

moment.locale('nb')

class Calendar extends React.Component {
  state = {
    today: moment(),
    weekOffset: 0,
    selectedTimes: [],
    multipleDays: false,
    recurring: false
  }

  constructor(props) {
    super(props)
    this.onHandleTimeClick = ::this.onHandleTimeClick
    this.onAdvanceClick = ::this.onAdvanceClick
    this.onSelectDay = ::this.onSelectDay
    this.changeWeek = ::this.changeWeek
    this.onHandleRecurringCheck = ::this.onHandleRecurringCheck
  }

  componentDidMount() {
    const {selectedDays, recurring} = this.props

    if (selectedDays && selectedDays.length > 0) {
      const selectedTimes = selectedDays
        .map(({start, end}) => {
          const hoursBetween = getHoursInBetween(start, end)
          return [start, ...hoursBetween]
        })
        .reduce((a, b) => a.concat(b))

      const multipleDays = getSelectedDays(selectedTimes).length > 1
      this.setState({selectedTimes, recurring, multipleDays})
      this.changeWeek(0)
    }

    const timeTable = document.getElementById('time-table')
    setTimeout(() => {
      timeTable.scrollTop = timeTable.scrollHeight
    })
  }

  get week() {
    return defaultWeek.map(day => {
      return moment().add(this.state.weekOffset, 'weeks').isoWeekday(day)
    })
  }

  onHandleTimeClick(time) {
    const {selectedTimes} = this.state
    const replaceHour = () => {
      this.setState({selectedTimes: [time]})
      this.onHandleRecurringCheck(null, this.state.recurring, [time])
    }

    if (selectedTimes.length > 0) {
      if (!selectedTimes[0].isSame(time, 'day')) {
        selectedTimes.push(time)
        this.setState({selectedTimes, recurring: false, multipleDays: true})
      } else {
        const bookingEvents = this.props.room.bookings.map(({events}) => events)
        const events = bookingEvents.length
          ? bookingEvents.reduce((a, b) => a.concat(b))
          : []

        const conflict = getHoursInBetween(selectedTimes[0], time)
          .map(hour => isHourBooked(null, null, events, hour))
          .filter(value => value)
          .length > 0

        if (conflict) {
          replaceHour()
        } else {
          selectedTimes.push(time)
          this.setState({selectedTimes})
          this.onHandleRecurringCheck(null, this.state.recurring, selectedTimes)
        }
      }
    } else {
      replaceHour()
    }
  }

  changeWeek(weeks) {
    const currentWeek = this.week
    const newWeek = currentWeek[0].clone().add(weeks, 'week')
    this.props.onWeekChange(
      newWeek.startOf('week').format('x').toString(),
      newWeek.endOf('week').add(1, 'seconds').format('x').toString()
    )
    this.setState({weekOffset: this.state.weekOffset + weeks})
  }

  onSelectDay(day) {
    const selectedTimes = this.state.selectedTimes.concat(openingHours(day, defaultOpenedHours))
    const selectedDays = getSelectedDays(selectedTimes)
    this.setState({selectedTimes, multipleDays: selectedDays.length > 1})
  }

  onAdvanceClick() {
    const {selectedTimes, recurring} = this.state
    const {recurringBookings} = this.props.room

    const selectedDays = recurring
      ? getRecurringDays(selectedTimes, recurringBookings)
      : getSelectedDays(selectedTimes)

    const days = getStartAndEndPerDay(selectedDays, selectedTimes, recurring)
    this.props.onSelectTimeHandler(days, this.state.recurring)
  }

  onHandleRecurringCheck(event, value, times) {
    const {start, end} = startAndEndSelection(times || this.state.selectedTimes)
    const recurring = event ? event.target.checked : value

    if (start && end && recurring && !this.state.recurring) {
      this.props.onHandleRecurringCheck(
        recurring,
        start.format('x').toString(),
        end.format('x').toString()
      )
    } else {
      this.props.onHandleRecurringCheck(false)
    }
    this.setState({recurring})
  }

  render() {
    const {selectedTimes, multipleDays, recurring, weekOffset} = this.state
    const {week} = this
    const adminMode = this.props.adminMode
    const {
      bookings, unavailableDates, recurringBookings,
      semesterStart, semesterEnd
    } = this.props.room

    const bookingEvents = (bookings || []).map(({events}) => events || [])
    const events = bookingEvents.length
      ? bookingEvents.reduce((a, b) => a.concat(b))
      : []

    const semester = {start: semesterStart, end: semesterEnd}

    return (
      <div className={css(styles.wrapper)}>
        <div className={css(styles.header)}>
          <div style={{margin: -16, marginBottom: 16}}>
            <Header room={this.props.room} onHandleClose={this.props.onHandleClose} />
          </div>
          <WeekNavigator
            currentWeek={week[0].clone()}
            currentWeekOffset={weekOffset}
            semester={semester}
            onHandleWeekChange={this.changeWeek}/>
          <WeekDays
            week={week}
            events={events}
            unavailableDates={adminMode ? [] : unavailableDates}
            onHandleSelectDay={this.onSelectDay}
            semester={semester}/>
        </div>
        <div id="time-table" className={css(styles.timeTable)}>
          <TimeRows
            week={week}
            events={events}
            unavailableDates={unavailableDates}
            selectedTimes={selectedTimes}
            semester={semester}
            adminMode={adminMode}
            onHandleTimeClick={this.onHandleTimeClick}/>
        </div>
        <div className={css(styles.footer)}>
          <HourLegend />

          <RecurringBooking
            multipleDays={multipleDays}
            recurring={recurring}
            onHandleRecurringCheck={this.onHandleRecurringCheck}
            recurringBookings={recurringBookings}/>

          <CenterContent>
            <div>
              <PaddedButton
                disabled={!this.state.selectedTimes.length}
                label="Gå videre"
                style={{margin: 'auto'}}
                onTouchTap={this.onAdvanceClick}
                backgroundColor={theme.bookingColor}/>
            </div>
          </CenterContent>
          <CenterContent>
            <div style={{marginTop: 16}}>
              <ActionLink
                onTouchTap={this.props.onHandleClose}>
                Avbryt
              </ActionLink>
            </div>
          </CenterContent>
        </div>
      </div>
    )
  }
}

Calendar.propTypes = {
  room: React.PropTypes.object,
  adminMode: React.PropTypes.bool,
  selectedDays: React.PropTypes.array,
  recurring: React.PropTypes.bool,
  onSelectTimeHandler: React.PropTypes.func.isRequired,
  onWeekChange: React.PropTypes.func.isRequired,
  onHandleClose: React.PropTypes.func.isRequired,
  onHandleRecurringCheck: React.PropTypes.func.isRequired
}

export default Calendar
