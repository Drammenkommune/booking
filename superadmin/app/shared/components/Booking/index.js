import React from 'react'

import BookingInfo from './BookingInfo'
import BookingPeriod from './BookingPeriod'
import BookingOrganization from './BookingOrganization'
import RoomInfo from './RoomInfo'
import Comment from './Comment'

import {GridContainer, PaddedButton, RecurringEvents} from '@/components'
import {theme} from '@/services'

class Booking extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showEvents: false
    }
    this.onOpenEvents = ::this.onOpenEvents
    this.onCloseEvents = ::this.onCloseEvents
  }

  isCancellable(events) {
    return parseInt(events[events.length - 1].end, 10) > new Date().getTime()
  }

  onOpenEvents() {
    this.setState({showEvents: true})
  }

  onCloseEvents() {
    this.setState({showEvents: false})
  }

  render() {
    const {
      booking, isAdmin,
      onCancelBookingClick,
      onCancelEventClick,
      onOwnerComment,
      roomRedirect
    } = this.props
    const {showEvents} = this.state
    const cancellable = this.isCancellable(booking.events)
    return booking
      ? (
        <div>
          {
            showEvents && booking.events.length > 1
            && (
              <RecurringEvents
                events={booking.events}
                onCancelEventClick={onCancelEventClick}
                onHandleClose={this.onCloseEvents}/>
            )
          }
          <GridContainer>
            <div>
              <BookingInfo booking={booking} roomRedirect={roomRedirect}/>
            </div>
            <div>
              <BookingPeriod booking={booking} onOpenEvents={this.onOpenEvents} />
            </div>
            <div>
              <BookingOrganization booking={booking} />
            </div>
            <div>
              <RoomInfo booking={booking} />
            </div>
            {isAdmin && (
              <div>
                <Comment booking={booking} onOwnerComment={onOwnerComment} />
              </div>
            )}
          </GridContainer>
          {cancellable
            ? (
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <PaddedButton
                  label="Kanseller booking"
                  color="#FFF"
                  backgroundColor={theme.errorColor}
                  onTouchTap={onCancelBookingClick}
                />
              </div>
            )
            : null
          }
        </div>
      )
      : null
  }
}

Booking.propTypes = {
  booking: React.PropTypes.object,
  isAdmin: React.PropTypes.bool,
  onCancelBookingClick: React.PropTypes.func,
  onCancelEventClick: React.PropTypes.func,
  onOwnerComment: React.PropTypes.func,
  roomRedirect: React.PropTypes.string
}

export default Booking
