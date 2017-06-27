import React from 'react'
import {ListItem, IconButton, Avatar} from 'material-ui'
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right'

import {theme} from '@/services'
import ListDivider from '@/components/ListDivider'
import {Title, Subtitle} from '@/components/ListItem'
import {AvatarPlaceholder} from '@/icons'

const Room = ({room, redirectUrl, disabled}) => {
  const primaryText = (
    <Title title={room.ownerName || room.name} centered={!room.ownerName}/>
  )
  const secondaryText = (
    <Subtitle title={room.ownerName ? room.name : ''} style={{height: 18}}/>
  )
  const avatar = room.images.length
    ? (<Avatar src={room.images[0].thumbnail} />)
    : (<AvatarPlaceholder style={{height: 40, width: 40}}/>)

  return (
    <div>
      <ListItem
        href={`${redirectUrl}${room.id}`}
        disabled={disabled}
        primaryText={primaryText}
        secondaryText={secondaryText}
        leftAvatar={avatar}
        rightIconButton={
          <IconButton disabled={disabled} aria-label="Gå til lokale">
            <RightIcon/>
          </IconButton>
        }
      />
      <ListDivider color={theme.roomColor}/>
    </div>
  )
}

Room.propTypes = {
  room: React.PropTypes.object.isRequired,
  redirectUrl: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool
}

export default Room
