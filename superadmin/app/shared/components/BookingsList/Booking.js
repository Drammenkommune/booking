import React from 'react'
import {ListItem, IconButton, Avatar} from 'material-ui'
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right'
import InfoIcon from 'material-ui/svg-icons/action/info'
import ChatIcon from 'material-ui/svg-icons/communication/comment'

import {formatBookingTime, theme} from '@/services'
import ListDivider from '@/components/ListDivider'
import {Title, Subtitle} from '@/components/ListItem'
import {AvatarPlaceholder} from '@/icons'


const Booking = ({booking, redirectUrl}) => {
  const primaryText = (
    <Title title={`${booking.room.name}, ${booking.organization}`} />
  )

  const icons = []
  if (booking.userComment) {
    icons.push(
      <InfoIcon key={'infoicon'} style={{height: 22, color: 'inherit'}} />
    )
  }
  if (booking.ownerComment) {
    icons.push(
      <ChatIcon key={'chaticon'} style={{height: 22, color: 'inherit'}} />
    )
  }

  const secondaryText = (
    <Subtitle
      style={{textTransform: 'capitalize'}}
      title={formatBookingTime(booking.start, booking.end)}
      icons={icons}/>
  )
  const avatar = booking.room.images.length
    ? (<Avatar alt="Bilde av lokalet" src={booking.room.images[0].thumbnail} />)
    : (<AvatarPlaceholder style={{height: 40, width: 40}}/>)
  return (
    <div>
      <ListItem
        href={`${redirectUrl}${booking.bookingId}`}
        primaryText={primaryText}
        secondaryText={secondaryText}
        leftAvatar={avatar}
        rightIconButton={
          <IconButton aria-label="Gå til booking">
            <RightIcon/>
          </IconButton>
        }
      />
      <ListDivider color={theme.bookingColor}/>
    </div>
  )
}

Booking.propTypes = {
  booking: React.PropTypes.object.isRequired,
  redirectUrl: React.PropTypes.string.isRequired,
}

export default Booking
