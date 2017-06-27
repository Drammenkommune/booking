import React from 'react'

import Card from '@/components/Card'
import {formatNewLines} from '@/services'

const RoomInfo = ({booking}, {theme}) => {
  return (
    <Card title="Viktig informasjon" dividerColor={theme.bookingColor}>
      <div style={{padding: 16}}>
        {formatNewLines(booking.room.info)}
      </div>
    </Card>
  )
}

RoomInfo.propTypes = {
  booking: React.PropTypes.object
}

RoomInfo.contextTypes = {
  theme: React.PropTypes.object.isRequired
}

export default RoomInfo
