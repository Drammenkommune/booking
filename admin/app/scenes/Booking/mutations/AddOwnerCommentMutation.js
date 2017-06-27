import Relay from 'react-relay'

export default class AddOwnerCommentMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {AddOwnerComment}`
  }

  getVariables() {
    const {ownerComment, bookingId} = this.props
    return {ownerComment, bookingId }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddOwnerCommentPayload {
        booking { ownerComment }
      }
    `
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {booking: this.props.bookingId},
      }
    ]
  }
}
