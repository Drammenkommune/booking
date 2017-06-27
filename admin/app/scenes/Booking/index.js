import React from 'react'
import Relay from 'react-relay'

import RemoveBookingMutation from './mutations/RemoveBookingMutation'
import RemoveBookingEventMutation from './mutations/RemoveBookingEventMutation'
import AddOwnerCommentMutation from './mutations/AddOwnerCommentMutation'
import {Booking} from '@/components'
import {receipt} from '@/services'
import {mutate} from '~/services'

const BookingContainer = ({booking}, {router}) => {
  const onHandleRemoveEvent = (event, id) => {
    event.preventDefault()
    const message = booking.user && booking.user.id
      ? window.prompt('Hvilken grunn vil du oppgi for kanselleringen?')
      : false

    if (message || message === false && window.confirm('Er du sikker på at du vil kansellere bookingen?')) {
      mutate(new RemoveBookingEventMutation({id, bookingId: booking.id, message}))
    }
  }
  const onHandleClick = (event) => {
    const message = booking.user && booking.user.id
      ? window.prompt('Hvilken grunn vil du oppgi for kanselleringen?')
      : false

    const id = booking.id
    const roomId = booking.room.id

    event.preventDefault()
    if (message || message === false && window.confirm('Er du sikker på at du vil kansellere bookingen?')) {
      mutate(new RemoveBookingMutation({id, roomId, message}))
        .then(_ => {
          receipt.setType(booking.user && booking.user.id
            ? 'adminCancelledBooking'
            : 'userCancelledBooking'
          )
          router.push('/kvittering')
        })
    }
  }

  const onOwnerComment = (ownerComment) => {
    const mutation = new AddOwnerCommentMutation({ownerComment, bookingId: booking.id})
    return mutate(mutation)
  }

  return booking
    ? (
      <Booking
        booking={booking}
        isAdmin={true}
        onOwnerComment={onOwnerComment}
        onCancelBookingClick={onHandleClick}
        onCancelEventClick={onHandleRemoveEvent}
        roomRedirect="/admin/#/lokale/"/>
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
        user { id },
        organization,
        activity,
        userComment,
        ownerComment,
        recurring,
        events { id, start, end },
        room { id, name, info, deleted, ownerName },
        user { name, phone, email },
      },
    `,
  },
})
