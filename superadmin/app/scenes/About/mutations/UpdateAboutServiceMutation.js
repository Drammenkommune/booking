import Relay from 'react-relay'

export default class UpdateAboutService extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {UpdateAboutService}`
  }

  getVariables() {
    const {adminId, aboutService} = this.props
    return {adminId, aboutService}
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateAboutServicePayload {
        admin
      }
    `
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {admin: this.props.adminId},
      }
    ]
  }
}
