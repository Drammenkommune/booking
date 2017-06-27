import React from 'react'
import Relay from 'react-relay'
import AddIcon from 'material-ui/svg-icons/content/add'

import Owner from './Owner'
import {Card, CardActionButton} from '@/components'
import {theme} from '@/services'

const Owners = ({owners}, {router}) => (
  <Card
    title="Utleiere"
    color={theme.roomColor}
    action={(
      <CardActionButton
        onTouchTap={() => router.push('/utleier/ny')}
        icon={<AddIcon />}
        label="Legg til"/>
    )}>
    {owners.map(owner => (<Owner key={owner.id} owner={owner}/>))}
  </Card>
)


Owners.propTypes = {
  owners: React.PropTypes.array
}

Owners.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Relay.createContainer(Owners, {
  fragments: {
    owners: _ => Relay.QL`
      fragment on Owner @relay(plural: true) {
        id, name, address, postalCode, postalArea
      }
    `
  }
})
