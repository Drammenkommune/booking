import React from 'react'
import Relay from 'react-relay'

import {RoomForm} from '~/components'
import UpdateRoomMutation from './mutations/UpdateRoomMutation'

const UpdateRoom = ({room}, {router}) => {
  const onSubmitSuccess = () => {
    router.push(`/lokale/${room.id}`)
  }

  const onDeleteSuccess = () => {
    router.push('/')
  }

  return room
    ? (
      <RoomForm
        room={room}
        onSubmitMutation={UpdateRoomMutation}
        onDeleteSuccess={onDeleteSuccess}
        onSubmitSuccess={onSubmitSuccess}
        submitLabel="Lagre endringer"/>
    )
    : null
}

UpdateRoom.propTypes = {
  room: React.PropTypes.object.isRequired
}

UpdateRoom.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

export default Relay.createContainer(UpdateRoom, {
  initialVariables: {
    start: new Date().getTime().toString()
  },
  fragments: {
    room: () => Relay.QL`
      fragment on Room {
        id, name, type, size,
        maxPeople, facilities, info,
        owner {
          id
        },
        images {
          url, thumbnail
        }
        bookings (start: $start) {
          id,
          events (start: $start) {
            start, end
          }
        }
      }
    `
  }
})
