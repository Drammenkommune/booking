import React from 'react'
import Relay from 'react-relay'

import ConfirmBookingWrapper from './ConfirmBookingWrapper'
import {
  previousLocation, getBookingDatesAndTimes,
  removeBookingDatesAndTime, getBookingRecurring
} from '@/services'

class NewBooking extends React.Component {

  state = {
    selectedDays: null,
    recurring: false
  }

  componentWillMount() {
    const selectedDays = getBookingDatesAndTimes()
    const recurring = getBookingRecurring()
    if (!selectedDays || selectedDays.length === 0) {
      const back = previousLocation() || '/'
      window.location.replace(`/admin/#${back}`)
    }
    if (recurring) {
      this.props.relay.forceFetch({
        start: selectedDays[0].start.format('x').toString(),
        end: selectedDays[0].start.format('x').toString(),
        recurring
      })
    }

    this.setState({selectedDays, recurring})
  }

  componentWillUnmount() {
    removeBookingDatesAndTime()
  }

  render() {
    const {selectedDays, recurring} = this.state
    const {room} = this.props
    return (
      <ConfirmBookingWrapper
        room={room}
        selectedDays={selectedDays}
        recurring={recurring}
      />
    )
  }
}

NewBooking.propTypes = {
  room: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
}

export default Relay.createContainer(NewBooking, {
  initialVariables: {
    start: null,
    end: null,
    recurring: false
  },
  fragments: {
    room: () => Relay.QL`
      fragment on Room {
        id, name, ownerName, info, type,
        address,
        contact {
          name, phoneNumber
        },
        recurringBookings(start: $start, end: $end) @include(if: $recurring) {
          id, status
        }
      }
    `
  }
})
