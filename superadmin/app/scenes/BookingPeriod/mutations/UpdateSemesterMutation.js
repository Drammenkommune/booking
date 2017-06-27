import Relay from 'react-relay'

export default class UpdateSemesterStart extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {UpdateSemester}`
  }

  getVariables() {
    const {semesterStart, semesterEnd} = this.props
    return {semesterStart, semesterEnd}
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateSemesterPayload {
        admin
      }
    `
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        admin: this.props.adminId
      }
    }]
  }
}
