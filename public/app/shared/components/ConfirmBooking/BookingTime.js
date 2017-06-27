import React from 'react'
import {Card} from '@/components'
import {theme} from '@/services'
import Time from './Time'

const BookingTime = ({selectedDays, room, onOpenEvents}) => {
  return (
    <Card title="Tidspunkt" style={{width: '100%'}} dividerColor={theme.bookingColor}>
      <Time
        selectedDays={selectedDays}
        recurring={room.recurringBookings}
        onOpenEvents={onOpenEvents}/>
    </Card>
  )
}

BookingTime.propTypes = {
  selectedDays: React.PropTypes.array.isRequired,
  room: React.PropTypes.object.isRequired,
  onOpenEvents: React.PropTypes.func.isRequired,
}

export default BookingTime
