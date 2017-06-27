import Relay from 'react-relay'

export default class AddNameToUserMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {AddNameToUser}`
  }

  getVariables() {
    const {name, token} = this.props
    return {name, token}
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddNameToUserPayload {
        user
      }
    `
  }

  getConfigs() {
    return []
  }
}
