import Relay from 'react-relay'

export default class RemoveUnavailableDateFromOwnerMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {RemoveUnavailableDateFromOwner}`
  }

  getVariables() {
    const {dateId} = this.props
    return {dateId}
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveUnavailableDateFromOwnerPayload {
        deletedDateId
        owner { unavailableDates }
      }
    `
  }

  getConfigs() {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'owner',
        parentID: this.props.ownerId,
        connectionName: 'unavailableDate',
        deletedIDFieldName: 'deletedDateId'
      }
    ]
  }

  getOptimisticResponse() {
    return {
      deletedDateId: this.props.dateId,
      owner: { id: this.props.ownerId }
    }
  }

}
