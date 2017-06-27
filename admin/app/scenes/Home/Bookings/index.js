import React from 'react'
import Relay from 'react-relay'
import moment from 'moment'

import {Card, BookingsList, Link} from '@/components'

const footer = (
  <div>
    <Link to="/admin/#/bookinger">Alle bookinger</Link>
    <Link to="/admin/#/bookinghistorikk">Bookinghistorikk</Link>
  </div>
)

const BookingsContainer = ({owner, disabled}, {theme}) => (
  <Card title="Ukens bookinger" color={theme.bookingColor}>
    <BookingsList
      disabled={disabled}
      bookings={owner.bookings}
      redirectUrl="/admin/#/booking/"
      footer={footer}/>
  </Card>
)

BookingsContainer.propTypes = {
  owner: React.PropTypes.object,
  disabled: React.PropTypes.bool
}

BookingsContainer.contextTypes = {
  theme: React.PropTypes.object.isRequired
}

export default Relay.createContainer(BookingsContainer, {
  initialVariables: {
    start: moment().format('x').toString(),
    end: moment().endOf('week').add(1, 'seconds').format('x').toString()
  },
  fragments: {
    owner: () => Relay.QL`
      fragment on Owner {
        id,
        bookings (start: $start, end: $end) {
          id,
          organization,
          userComment,
          ownerComment,
          room { name, images { url, thumbnail } },
          recurring,
          events (start: $start, end: $end) { id, start, end }
        }
      }
    `
  }
})
