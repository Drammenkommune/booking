import Relay from 'react-relay'

export default class UpdateTermsAndAgreement extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {UpdateTermsAndAgreement}`
  }

  getVariables() {
    const {adminId, termsAndAgreement, pdfDownloadUrl, pdfFileName} = this.props
    return {adminId, termsAndAgreement, pdfDownloadUrl, pdfFileName}
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateTermsAndAgreementPayload {
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
