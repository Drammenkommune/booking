import Relay from 'react-relay'

export default class RemoveRoomMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {RemoveRoom}`
  }

  getVariables() {
    return { id: this.props.id }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveRoomPayload {
        deletedRoomId,
        owner
      }
    `
  }

  getConfigs() {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'owner',
        parentID: this.props.ownerId,
        connectionName: 'room',
        deletedIDFieldName: 'deletedRoomId'
      }
    ]
  }

  getOptimisticResponse() {
    return {
      deletedBookingId: this.props.id,
      owner: { id: this.props.ownerId }
    }
  }

}
