import Relay from 'react-relay'

export default class RemoveBookingMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {RemoveBooking}`
  }

  getVariables() {
    return { id: this.props.id }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveBookingPayload {
        deletedBookingId,
        user { bookings },
      }
    `
  }

  getConfigs() {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'user',
        parentID: this.props.roomId,
        connectionName: 'booking',
        deletedIDFieldName: 'deletedBookingId'
      }
    ]
  }

  getOptimisticResponse() {
    return {
      deletedBookingId: this.props.id,
      user: { id: this.props.userId }
    }
  }

}
