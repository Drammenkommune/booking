import React from 'react'
import Calendar from './Calendar'
import EventSelection from './EventSelection'

import {setBookingDatesAndTime} from '@/services'

class TimeChooser extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectionMode: false,
      selectedDays: null,
      recurring: false
    }
    this.onSelectTimeHandler = ::this.onSelectTimeHandler
    this.onCancelEventClick = ::this.onCancelEventClick
    this.onAdvanceClick = ::this.onAdvanceClick
    this.onBackClick = ::this.onBackClick
  }

  onSelectTimeHandler(days, recurring) {
    if (days.length === 1) {
      setBookingDatesAndTime(days)
      this.props.onSelectTimeHandler()
    } else {
      const {recurringBookings} = this.props.room
      this.setState({
        selectedDays: recurring
          ? days.map((day, index) => ({...day, status: recurringBookings[index].status}))
          : days,
        selectionMode: true,
        recurring
      })
    }
  }

  onCancelEventClick(date) {
    const remainingDays = this.state.selectedDays
      .filter(({day}) => {
        return !day.isSame(date, 'day')
      })

    this.setState({selectedDays: remainingDays})
  }

  onAdvanceClick() {
    setBookingDatesAndTime(this.state.selectedDays, this.state.recurring)
    this.props.onSelectTimeHandler()
  }

  onBackClick() {
    this.setState({selectionMode: false})
  }

  render() {
    const {selectionMode, selectedDays, recurring} = this.state
    const {
      room, onWeekChange,
      onHandleClose, onHandleRecurringCheck,
      adminMode
    } = this.props
    const {recurringBookings} = room
    return selectionMode && selectedDays && selectedDays.length > 0
      ? (
        <EventSelection
          onHandleClose={onHandleClose}
          selectedDays={selectedDays}
          onAdvanceClick={this.onAdvanceClick}
          onBackClick={this.onBackClick}
          recurringBookings={recurringBookings}
          onCancelEventClick={this.onCancelEventClick}/>
      )
      : (
        <Calendar
          room={room}
          selectedDays={selectedDays}
          recurring={recurring}
          adminMode={adminMode}
          onHandleClose={onHandleClose}
          onSelectTimeHandler={this.onSelectTimeHandler}
          onWeekChange={onWeekChange}
          onHandleRecurringCheck={onHandleRecurringCheck}/>
      )
  }

}

TimeChooser.propTypes = {
  room: React.PropTypes.object,
  adminMode: React.PropTypes.bool,
  onSelectTimeHandler: React.PropTypes.func.isRequired,
  onWeekChange: React.PropTypes.func.isRequired,
  onHandleClose: React.PropTypes.func.isRequired,
  onHandleRecurringCheck: React.PropTypes.func.isRequired
}

export default TimeChooser
