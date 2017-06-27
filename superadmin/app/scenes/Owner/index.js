import React from 'react'
import Relay from 'react-relay'

import {GridContainer} from '@/components'
import Owner from './Owner'

const OwnerContainer = ({node}) => {
  return (
    <GridContainer>
      <div>
        <Owner owner={node} />
      </div>
    </GridContainer>
  )
}

OwnerContainer.propTypes = {
  node: React.PropTypes.object.isRequired
}

export default Relay.createContainer(OwnerContainer, {
  fragments: {
    node: _ => Relay.QL`
      fragment on Owner {
        ${Owner.getFragment('owner')}
      }
    `
  }
})
