import Relay from 'react-relay'

export default class AddBookingMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {AddBooking}`
  }

  getVariables() {
    const {events, roomId, organization, activity, userId, recurring} = this.props
    return {events, roomId, organization, activity, userId, recurring }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddBookingPayload {
        room
      }
    `
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on AddBookingPayload {
            booking
          }
        `,
      ],
    }
    ]
  }
}
