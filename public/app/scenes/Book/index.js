import React from 'react'
import Relay from 'react-relay'

import ConfirmBookingWrapper from './ConfirmBookingWrapper'
import {
  previousLocation, requiresAuth, removeBookingDatesAndTime,
  getBookingDatesAndTimes, getBookingRecurring
} from '@/services'

class BookContainer extends React.Component {

  state = {
    selectedDays: null,
    recurring: false
  }

  componentDidMount() {
    const selectedDays = getBookingDatesAndTimes()
    const recurring = getBookingRecurring()

    if (!selectedDays || selectedDays.length === 0) {
      const back = previousLocation() || '/'
      window.location.replace(`/#${back}`)
    }

    if (recurring) {
      this.props.relay.forceFetch({
        start: selectedDays[0].start.format('x').toString(),
        end: selectedDays[0].end.format('x').toString(),
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
    const {room, user: {termsAndAgreement, pdfFile}} = this.props

    const Authenticated = requiresAuth(ConfirmBookingWrapper, 'dk_public_token', '/#/logg-inn', true)

    return selectedDays
      ? (
        <Authenticated
          termsAndAgreement={termsAndAgreement}
          pdfDownloadUrl={pdfFile ? pdfFile.downloadUrl : null}
          room={room}
          selectedDays={selectedDays}
          recurring={recurring}
        />
      )
      : null
  }
}

BookContainer.propTypes = {
  room: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
}

export default Relay.createContainer(BookContainer, {
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
    `,
    user: () => Relay.QL`
      fragment on User {
        termsAndAgreement,
        pdfFile {
          downloadUrl
        }
      }
    `
  }
})
