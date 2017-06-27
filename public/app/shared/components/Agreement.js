import React from 'react'
import {formatNewLinesAsPoints} from '@/services'

const Agreement = ({termsAndAgreement, pdfDownloadUrl, hideTitle}) => (
  <div>
    {!hideTitle && (<h2>Vilkår for leie</h2>)}
    {formatNewLinesAsPoints(termsAndAgreement)}
    {pdfDownloadUrl && (<a href={pdfDownloadUrl} target="_blank" download>Se utleiekontrakt</a>)}
  </div>
)

Agreement.propTypes = {
  termsAndAgreement: React.PropTypes.string.isRequired,
  pdfDownloadUrl: React.PropTypes.string,
  hideTitle: React.PropTypes.bool
}

export default Agreement
