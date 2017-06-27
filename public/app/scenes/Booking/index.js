import React from 'react'
import Relay from 'react-relay'

import RemoveBookingMutation from './mutations/RemoveBookingMutation'
import RemoveBookingEventMutation from './mutations/RemoveBookingEventMutation'
import {Booking} from '@/components'
import {receipt} from '@/services'
import {mutate} from '~/services'

const BookingContainer = ({booking}, {router}) => {
  const onHandleRemoveEvent = (event, id) => {
    event.preventDefault()
    if (window.confirm('Er du sikker på at du vil kansellere en del av bookingen?')) {
      mutate(new RemoveBookingEventMutation({id, bookingId: booking.id}))
    }
  }
  const onHandleRemoveBooking = (event) => {
    const id = booking.id
    const userId = booking.user.id

    // Need to preventDefault, otherwise it triggers twice
    event.preventDefault()
    if (window.confirm('Er du sikker på at du vil kansellere bookingen?')) {
      mutate(new RemoveBookingMutation({id, userId}))
        .then(_ => {
          receipt.setType('userCancelledBooking')
          router.push('/kvittering')
        })
    }
  }

  return booking
    ? (
      <Booking
        booking={booking}
        onCancelBookingClick={onHandleRemoveBooking}
        onCancelEventClick={onHandleRemoveEvent}
        roomRedirect="/#/lokale/"/>
    )
    : null
}

BookingContainer.propTypes = {
  booking: React.PropTypes.object
}

BookingContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Relay.createContainer(BookingContainer, {
  fragments: {
    booking: _ => Relay.QL`
      fragment on Booking {
        id,
        organization,
        activity,
        userComment,
        recurring,
        events { id, start, end },
        room { id, name, info, deleted, ownerName },
        user { id, name, phone, email },
      },
    `,
  },
})
