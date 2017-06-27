import React from 'react'
import Relay from 'react-relay'

import Owners from './Owners'
import Functions from './Functions'
import {GridContainer} from '@/components'

const Home = ({admin}) => (
  <GridContainer>
    <div>
      <Owners owners={admin.owners} />
    </div>
    <div>
      <Functions />
    </div>
  </GridContainer>
)

Home.propTypes = {
  admin: React.PropTypes.object
}

export default Relay.createContainer(Home, {
  fragments: {
    admin: _ => Relay.QL`
      fragment on Admin {
        id, email,
        owners {
          ${Owners.getFragment('owners')},
        },
      },
    `,
  },
})
