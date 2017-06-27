import Relay from 'react-relay'

export default class UpdateRoom extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {UpdateRoom}`
  }

  getVariables() {
    const {
      roomId, name, type, maxPeople, images,
      size, facilities, info
    } = this.props
    return {
      roomId, name, type, maxPeople, images,
      size, facilities, info
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateRoomPayload {
        room
      }
    `
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {room: this.props.roomId},
      }
    ]
  }
}
