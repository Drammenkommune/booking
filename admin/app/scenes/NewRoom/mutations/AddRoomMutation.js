import Relay from 'react-relay'

export default class AddRoom extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {AddRoom}`
  }

  getVariables() {
    const {
      name, type, maxPeople,
      images, size,
      facilities, info
    } = this.props

    return {
      name, type, maxPeople,
      images, size,
      facilities, info
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddRoomPayload {
        owner { rooms }
        room
      }
    `
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'owner',
        parentID: this.props.ownerId,
        connectionName: 'room',
        edgeName: 'room',
        rangeBehaviors: {
          '': 'append',
        }
      }
    ]
  }
}
