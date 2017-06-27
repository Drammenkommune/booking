import Relay from 'react-relay'

export default class AddOwner extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {AddOwner}`
  }

  getVariables() {
    const {
      name, location, email, password,
      address, postalCode, postalArea,
      contactName, contactPhone
    } = this.props
    return {
      name, location, email, password,
      address, postalCode, postalArea,
      contactName, contactPhone
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddOwnerPayload {
        owner
      }
    `
  }

  getConfigs() {
    return []
  }
}
