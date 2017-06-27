import React from 'react'
import Relay from 'react-relay'

import OldBookings from './OldBookings'
import {GridContainer} from '@/components'

class OldBookingsContainer extends React.Component {

  static propTypes = {
    owner: React.PropTypes.object
  }

  render() {
    const {owner} = this.props
    return (
      <GridContainer>
        <div>
          <OldBookings owner={owner}/>
        </div>
      </GridContainer>
    )
  }
}

export default Relay.createContainer(OldBookingsContainer, {
  fragments: {
    owner: _ => Relay.QL`
      fragment on Owner {
        ${OldBookings.getFragment('owner')}
      },
    `,
  },
})
