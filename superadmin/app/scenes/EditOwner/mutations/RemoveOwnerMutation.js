import Relay from 'react-relay'

export default class RemoveOwner extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {RemoveOwner}`
  }

  getVariables() {
    const {id} = this.props
    return {id}
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveOwnerPayload {
        deletedOwnerId,
        admin { owners }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'admin',
      parentID: this.props.adminId,
      connectionName: 'owner',
      deletedIDFieldName: 'deletedOwnerId'
    }]
  }
}
