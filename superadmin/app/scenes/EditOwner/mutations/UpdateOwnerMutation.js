import Relay from 'react-relay'

export default class UpdateOwner extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {UpdateOwner}`
  }

  getVariables() {
    const {
      ownerId, name, location, email,
      address, postalCode, postalArea,
      contactName, contactPhone
    } = this.props
    return {
      ownerId, name, location, email,
      address, postalCode, postalArea,
      contactName, contactPhone
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateOwnerPayload {
        owner
      }
    `
  }

  getConfigs() {
    return []
  }
}
