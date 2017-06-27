import React from 'react'
import Relay from 'react-relay'

import {GridContainer, InlineText, PageTitle} from '@/components'
import {formatNewLines} from '@/services'

const About = ({user: { aboutService }}) => (
  <div>
    <PageTitle title="Om tjenesten" />
    <GridContainer>
      <div>
        <InlineText>
          {formatNewLines(aboutService)}
        </InlineText>
      </div>
    </GridContainer>
  </div>
)

About.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default Relay.createContainer(About, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        aboutService
      }
    `
  }
})
