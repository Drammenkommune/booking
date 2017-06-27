import Relay from 'react-relay'

export default class UpdateOwner extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {UpdateOwner}`
  }

  getVariables() {
    const {ownerId, address, postalCode, postalArea, contactName, contactPhone} = this.props
    return {ownerId, address, postalCode, postalArea, contactName, contactPhone}
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateOwnerPayload {
        owner
      }
    `
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {owner: this.props.ownerId},
      }
    ]
  }
}
