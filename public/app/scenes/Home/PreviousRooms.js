import React from 'react'

import {Card, RoomsList} from '@/components'
import {theme} from '@/services'

const MAX_ROOMS = 5

const PreviousRooms = ({rooms}) => {
  return (
    <Card title="Favorittlokaler" color={theme.roomColor}>
      <RoomsList rooms={rooms.length > MAX_ROOMS ? rooms.slice(0, MAX_ROOMS) : rooms} redirectUrl="/#/lokale/"/>
    </Card>
  )
}

PreviousRooms.propTypes = {
  rooms: React.PropTypes.array
}

export default PreviousRooms
