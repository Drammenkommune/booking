import React from 'react'
import Relay from 'react-relay'
import moment from 'moment'

import {BookingsList} from '@/components'

const RoomBookings = ({room}) => {
  return (
    <BookingsList bookings={room.bookings} redirectUrl="/admin/#/booking/"/>
  )
}

RoomBookings.propTypes = {
  room: React.PropTypes.object
}

export default Relay.createContainer(RoomBookings, {
  initialVariables: {
    start: moment().format('x').toString(),
  },
  fragments: {
    room: () => Relay.QL`
      fragment on Room {
        bookings (start: $start) {
          id,
          organization,
          userComment,
          ownerComment,
          room { name, images { url, thumbnail } },
          recurring,
          events (start: $start) { id, start, end },
        }
      }
    `
  }
})
