import React from 'react'

import {mutate} from '~/services'
import AddBookingMutation from './mutations/AddBookingMutation'
import {ConfirmBooking} from '@/components'
import { receipt, previousLocation, theme, constructSubtitle } from '@/services'

const ConfirmBookingWrapper = ({selectedDays, room, recurring, termsAndAgreement, pdfDownloadUrl}, {router, user}) => {
  const bookRoom = (organization, activity, userComment) => {
    const recurring = room.recurringBookings && room.recurringBookings.length > 0
    const mutation = new AddBookingMutation({
      events: selectedDays.map(({day, start, end}) => ({
        day: day.format('x'),
        start: start.format('x'),
        end: end.format('x')
      })),
      roomId: room.id,
      organization,
      activity,
      userComment,
      userId: user.id,
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
    window.location.replace(`/#${back}`)
  }

  return (
    <ConfirmBooking
      selectedDays={selectedDays}
      room={room}
      recurring={recurring}
      rules={true}
      onHandleSubmit={bookRoom}
      onHandleCancel={onHandleCancel}
      pdfDownloadUrl={pdfDownloadUrl}
      termsAndAgreement={termsAndAgreement}
    />
  )
}

ConfirmBookingWrapper.propTypes = {
  room: React.PropTypes.object.isRequired,
  selectedDays: React.PropTypes.array.isRequired,
  recurring: React.PropTypes.bool,
  termsAndAgreement: React.PropTypes.string.isRequired,
  pdfDownloadUrl: React.PropTypes.string
}

ConfirmBookingWrapper.contextTypes = {
  router: React.PropTypes.object.isRequired,
  user: React.PropTypes.object
}

export default ConfirmBookingWrapper
