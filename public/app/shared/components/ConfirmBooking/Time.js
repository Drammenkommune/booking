import React from 'react'

import {ActionLink, Content, InlineText} from '@/components'
import {formatBookingTime} from '@/services'

const bookingText = (day) => (
  formatBookingTime(day.start.format('x'), day.end.format('x'))
)

const renderMultiplesText = (selectedDays, recurring) => {
  if (recurring && recurring.length > 0) {
    const chosenDays = selectedDays.filter(({status}) => status === 'available').length
    const total = recurring.length

    return (
      <span>
        Du booker {chosenDays} av {total} gjenstående uker i dette semesteret.
        Første booking er uke {selectedDays[0].start.clone().week()}, {bookingText(selectedDays[0])}
      </span>
    )
  }
  return (
    <span>
      Du booker {selectedDays.length} bookinger.
      Første booking er {bookingText(selectedDays[0])}
    </span>
  )
}

const Time = ({selectedDays, recurring, onOpenEvents}) => {
  const text = selectedDays.length > 1
    ? renderMultiplesText(selectedDays, recurring)
    : (
      <span style={{textTransform: 'capitalize'}}>
        {bookingText(selectedDays[0])}
      </span>
    )
  return (
    <Content>
      <InlineText>
        {text}
        <br /><br />
        {selectedDays.length > 1 && (
          <ActionLink onTouchTap={onOpenEvents}>Vis alle</ActionLink>
        )}
      </InlineText>
    </Content>
  )
}

Time.propTypes = {
  selectedDays: React.PropTypes.array.isRequired,
  onOpenEvents: React.PropTypes.func.isRequired,
  recurring: React.PropTypes.array
}

export default Time
