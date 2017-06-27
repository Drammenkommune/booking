import React from 'react'

import {mutate} from '~/services'
import AddBookingMutation from './mutations/AddBookingMutation'
import {ConfirmBooking} from '@/components'
import {receipt, previousLocation, theme, constructSubtitle} from '@/services'

const ConfirmBookingWrapper = ({selectedDays, room, recurring}, {router}) => {
  const bookRoom = (organization, activity) => {
    const mutation = new AddBookingMutation({
      events: selectedDays.map(({day, start, end}) => ({
        day: day.format('x'),
        start: start.format('x'),
        end: end.format('x')
      })),
      roomId: room.id,
      organization,
      activity,
      recurring
    })

    const bookedSubtitle = constructSubtitle(selectedDays, room, recurring)

    mutate(mutation)
      .then((result) => {
        const bookingId = result.AddBooking.booking.id
        receipt.setType('newBoooking')
        receipt.setConfig(
          'Bookingbekreftelse',
          bookedSubtitle,
          theme.bookingColor,
          bookingId
        )

        sessionStorage.removeItem('dk_booking_recurring')
        sessionStorage.removeItem('dk_booking_start')
        sessionStorage.removeItem('dk_booking_end')
        router.push('/kvittering')
      })
  }

  const onHandleCancel = () => {
    const back = previousLocation()
    window.location.replace(`/admin/#${back}`)
  }

  return (
    <ConfirmBooking
      selectedDays={selectedDays}
      room={room}
      recurring={recurring}
      onHandleSubmit={bookRoom}
      onHandleCancel={onHandleCancel}
    />
  )
}

ConfirmBookingWrapper.propTypes = {
  room: React.PropTypes.object.isRequired,
  selectedDays: React.PropTypes.array.isRequired,
  recurring: React.PropTypes.bool,
}

ConfirmBookingWrapper.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ConfirmBookingWrapper
