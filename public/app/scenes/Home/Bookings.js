import React from 'react'

import {Card, BookingsList, Link} from '@/components'
import {theme} from '@/services'

const footer = (
  <Link to="/#/bookinghistorikk">Bookinghistorikk</Link>
)
const Bookings = ({bookings}) => {
  return (
    <Card title="Dine bookinger" color={theme.bookingColor}>
      <BookingsList
        bookings={bookings}
        redirectUrl="/#/booking/"
        footer={footer}/>
    </Card>
  )
}

Bookings.propTypes = {
  bookings: React.PropTypes.array
}

export default Bookings
