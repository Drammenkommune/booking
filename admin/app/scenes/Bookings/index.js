import React from 'react'
import Relay from 'react-relay'

import {Card, BookingsList, GridContainer} from '@/components'
import {theme} from '@/services'

const Bookings = ({owner}) => {
  return (
    <GridContainer>
      <Card title="Bookinger" color={theme.bookingColor}>
        <BookingsList
          bookings={owner.bookings}
          redirectUrl="/admin/#/booking/"/>
      </Card>
    </GridContainer>
  )
}

Bookings.propTypes = {
  owner: React.PropTypes.object.isRequired
}

export default Relay.createContainer(Bookings, {
  initialVariables: {
    start: new Date().getTime().toString(),
  },
  fragments: {
    owner: () => Relay.QL`
      fragment on Owner {
        id,
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
