import React from 'react'
import AddIcon from 'material-ui/svg-icons/content/add'

import {Card, CardActionButton, RoomsList} from '@/components'

const Rooms = ({rooms, disabled}, {theme}) => {
  const cardAction = (
    <CardActionButton
      aria-label="Opprett nytt lokale"
      label="Legg til"
      href={'/admin/#/nytt-lokale'}
      disabled={disabled}
      disableTouchRipple={true}
      icon={<AddIcon/>}/>

  )
  return (
    <Card
      title="Lokaler"
      color={theme.roomColor}
      action={cardAction}>
      <RoomsList redirectUrl="/admin/#/lokale/" rooms={rooms} disabled={disabled}/>
    </Card>
  )
}

Rooms.propTypes = {
  rooms: React.PropTypes.array,
  disabled: React.PropTypes.bool
}

Rooms.contextTypes = {
  theme: React.PropTypes.object.isRequired
}

export default Rooms
