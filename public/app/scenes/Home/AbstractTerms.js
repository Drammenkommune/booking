import React from 'react'
import {Card, Content} from '@/components'
import {formatNewLinesAsPoints} from '@/services'

const ABSTRACT_LENGTH = 200

const AbstractTerms = ({termsAndAgreement}) => {
  return (
    <div>
      <Card title="Vilkår" dividerColor="rgba(0, 0, 0, 0.12)">
        <div style={{paddingRight: 16}}>
          {formatNewLinesAsPoints(`${termsAndAgreement.slice(0, ABSTRACT_LENGTH)}...`)}
        </div>
        <Content>
          <a href="/#/vilkar">Les mer</a>
        </Content>
      </Card>
    </div>
  )
}

AbstractTerms.propTypes = {
  termsAndAgreement: React.PropTypes.string
}

export default AbstractTerms
