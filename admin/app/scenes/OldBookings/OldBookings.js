import React from 'react'
import Relay from 'react-relay'

import {Card, BookingsList} from '@/components'

const BookingsContainer = ({owner}, {theme}) => (
  <Card title="Bookinghistorikk" color={theme.bookingColor}>
    <BookingsList bookings={owner.bookings} redirectUrl="/admin/#/booking/"/>
  </Card>
)

BookingsContainer.propTypes = {
  owner: React.PropTypes.object
}

BookingsContainer.contextTypes = {
  theme: React.PropTypes.object.isRequired
}

export default Relay.createContainer(BookingsContainer, {
  initialVariables: {
    end: new Date().getTime().toString(),
  },
  fragments: {
    owner: () => Relay.QL`
      fragment on Owner {
        id,
        bookings (end: $end) {
          id,
          organization,
          userComment,
          ownerComment,
          room { name, images { url, thumbnail } },
          recurring,
          events (end: $end) { id, start, end },
        }
      }
    `
  }
})
