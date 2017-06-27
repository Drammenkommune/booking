import React from 'react'
import Relay from 'react-relay'

import {BookingsList, Card, GridContainer} from '@/components'
import {theme} from '@/services'

const OldBookings = ({user}) => {
  return (
    <GridContainer>
      <div>
        <Card title="Bookinghistorikk" color={theme.bookingColor}>
          <BookingsList
            bookings={user.bookings}
            redirectUrl="/#/booking/"/>
        </Card>
      </div>
    </GridContainer>
  )
}

OldBookings.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default Relay.createContainer(OldBookings, {
  initialVariables: {
    end: new Date().getTime().toString()
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        bookings(end: $end) {
          id,
          recurring,
          events {id, start, end},
          room { name, images { url, thumbnail } },
          organization,
          userComment
        }
      }
    `
  }
})
