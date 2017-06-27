import Relay from 'react-relay'

export default class AddUnavailableDateToOwner extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {AddUnavailableDateToOwner}`
  }

  getVariables() {
    const {startDate, endDate} = this.props
    return {startDate, endDate}
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddUnavailableDateToOwnerPayload {
        owner { unavailableDates {id, startDate, endDate} },
      }
    `
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'owner',
        parentID: this.props.ownerId,
        connectionName: 'unavailableDate',
        edgeName: 'unavailableDate',
        rangeBehaviors: {
          '': 'append',
        }
      }
    ]
  }

  getOptimisticResponse() {
    return {
      owner: { id: this.props.ownerId }
    }
  }
}
