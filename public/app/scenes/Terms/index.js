import React from 'react'
import Relay from 'react-relay'

import {Agreement, GridContainer, PageTitle} from '@/components'

const Terms = ({user: {termsAndAgreement, pdfFile}}) => (
  <div>
    <PageTitle title="Vilkår for leie" />
    <GridContainer>
      <div>
        <Agreement
          hideTitle={true}
          termsAndAgreement={termsAndAgreement}
          pdfDownloadUrl={pdfFile ? pdfFile.downloadUrl : null}
        />
      </div>
    </GridContainer>
  </div>
)

Terms.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default Relay.createContainer(Terms, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        termsAndAgreement,
        pdfFile {
          downloadUrl
        }
      }
    `
  }
})
