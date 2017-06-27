import React from 'react'

import {Card, CardTitle, Content, InlineText, BoldText} from '@/components'
import {formatNewLines} from '@/services'

const margin = {marginTop: 6}

const BookingOrganization = ({booking}, {theme}) => {
  return (
    <Card title="Detaljer" dividerColor={theme.bookingColor}>
      <Content>
        <InlineText style={margin}><BoldText>Hvem skal bruke lokalet: </BoldText>{booking.organization}</InlineText>
        <InlineText style={margin}><BoldText>Aktivitet: </BoldText>{booking.activity}</InlineText>
        <InlineText style={margin}>
          <BoldText>Bestiller: </BoldText>
          {booking.user
            ? `${booking.user.name}, ${booking.user.phone}, ${booking.user.email}`
            : booking.room.ownerName
          }
        </InlineText>
      </Content>
      {booking.userComment && (
        <div>
          <CardTitle title="Tilleggsinformasjon" dividerColor={theme.bookingColor}/>
          <Content>
            <p style={{margin: 0}}>
              {formatNewLines(booking.userComment)}
            </p>
          </Content>
        </div>
      )}
    </Card>
  )
}

BookingOrganization.propTypes = {
  booking: React.PropTypes.object
}

BookingOrganization.contextTypes = {
  theme: React.PropTypes.object.isRequired
}

export default BookingOrganization
