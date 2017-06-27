import React from 'react'
import {List} from 'material-ui'

import Booking from './Booking'

const sortByTime = (a, b) => {
  return parseInt(a.start, 10) - parseInt(b.start, 10)
}

const Bookings = ({bookings, footer, redirectUrl}) => {
  const bookingEvents = bookings.length
    ? bookings
      .map(({id, events, organization, userComment, ownerComment, room}) =>
        events.map(event => ({...event, organization, userComment, ownerComment, room, bookingId: id}))
      )
      .reduce((prev, curr) => prev.concat(curr))
      .sort(sortByTime)
    : []

  return (
    <div>
      {bookings.length
        ? <List style={{paddingTop: 0, paddingBottom: 0}}>
            {bookingEvents.map(booking => (
              <Booking
                key={booking.id}
                booking={booking}
                redirectUrl={redirectUrl}/>
            ))}
          </List>
        : <p style={{padding: 16}}>
          Ingen bookinger
        </p>
      }
      {footer}
    </div>
  )
}

Bookings.propTypes = {
  bookings: React.PropTypes.array,
  footer: React.PropTypes.node,
  redirectUrl: React.PropTypes.string.isRequired,
}

export default Bookings
