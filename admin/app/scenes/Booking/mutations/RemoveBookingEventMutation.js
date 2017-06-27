import Relay from 'react-relay'

export default class RemoveBookingEventMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {RemoveBookingEvent}`
  }

  getVariables() {
    return { id: this.props.id, message: this.props.message }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveBookingEventPayload {
        deletedBookingEventId,
        booking,
      }
    `
  }

  getConfigs() {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'booking',
        parentID: this.props.bookingId,
        connectionName: 'event',
        deletedIDFieldName: 'deletedBookingEventId'
      }
    ]
  }

  getOptimisticResponse() {
    return {
      deletedBookingId: this.props.id,
      booking: { id: this.props.bookingId }
    }
  }

}
