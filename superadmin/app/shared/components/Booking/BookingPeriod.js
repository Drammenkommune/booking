import React from 'react'

import {ActionLink, Card, Content} from '@/components'
import {formatBookingTime, formatDetailedRecurringText} from '@/services'

const BookingPeriod = ({booking, onOpenEvents}, {theme}) => {
  return (
    <Card title="Tidspunkt" dividerColor={theme.bookingColor}>
      <Content>
        <p style={{margin: 0}}>
          {booking.events.length > 1
            ? (
              <span>
                {formatDetailedRecurringText(booking.events)}<br /><br />
                <ActionLink onTouchTap={onOpenEvents}>Vis alle</ActionLink>
              </span>
            )
            : formatBookingTime(booking.events[0].start, booking.events[0].end)
          }
        </p>
      </Content>
    </Card>
  )
}

BookingPeriod.propTypes = {
  booking: React.PropTypes.object,
  onOpenEvents: React.PropTypes.func.isRequired
}

BookingPeriod.contextTypes = {
  theme: React.PropTypes.object.isRequired
}

export default BookingPeriod
