import Relay from 'react-relay'

export default class RemoveBookingMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {RemoveBooking}`
  }

  getVariables() {
    return { id: this.props.id, message: this.props.message }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveBookingPayload {
        deletedBookingId,
        room { bookings },
        owner { bookings }
      }
    `
  }

  getConfigs() {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'room',
        parentID: this.props.roomId,
        connectionName: 'booking',
        deletedIDFieldName: 'deletedBookingId'
      }
    ]
  }

  getOptimisticResponse() {
    return {
      deletedBookingId: this.props.id,
      room: { id: this.props.roomId }
    }
  }

}
