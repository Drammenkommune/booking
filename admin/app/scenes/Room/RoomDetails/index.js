import React from 'react'
import Relay from 'react-relay'

import {ListDivider, RoomFacilities, PaddedButton} from '@/components'
import {theme} from '@/services'
import RoomImages from './RoomImages'
import RoomInformation from './RoomInformation'
import RoomContact from './RoomContact'

const RoomDetails = ({room, onHandleBooking}) => {
  return (
    <div>
      <RoomImages room={room}/>
      <ListDivider color={theme.roomColor}/>
      <RoomFacilities
        facilities={room.facilities}
        size={room.size}
        maxPeople={room.maxPeople} />
      <RoomInformation room={room} />
      <RoomContact room={room} />
      <div style={{
        display: 'flex', justifyContent: 'center',
        padding: 16, paddingTop: 8
      }}>
        <PaddedButton
          label="Book"
          backgroundColor={theme.roomColor}
          onTouchTap={onHandleBooking}
          labelStyle={{padding: '0 56px'}}/>
      </div>
    </div>
  )
}

RoomDetails.propTypes = {
  room: React.PropTypes.object.isRequired,
  onHandleBooking: React.PropTypes.func.isRequired
}

export default Relay.createContainer(RoomDetails, {
  fragments: {
    room: () => Relay.QL`
      fragment on Room {
        id,
        size,
        maxPeople,
        facilities,
        ${RoomInformation.getFragment('room')}
        ${RoomContact.getFragment('room')}
        ${RoomImages.getFragment('room')}
      }
    `
  }
})
