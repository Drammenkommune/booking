import React from 'react'
import Relay from 'react-relay'

import UpdateOwnerMutation from './mutations/UpdateOwnerMutation'
import RemoveOwnerMutation from './mutations/RemoveOwnerMutation'
import {OwnerForm} from '~/components'
import {mutate} from '~/services'

const EditOwner = ({node}, {router}) => {
  function onHandleDelete() {
    const {id} = node
    const mutation = new RemoveOwnerMutation({id})
    mutate(mutation)
      .then(_ => router.push('/'))
  }

  function updateOwner(owner) {
    const mutation = new UpdateOwnerMutation({...owner, ownerId: node.id})
    mutate(mutation)
      .then(_ => router.push(`utleier/${node.id}`))
  }

  return (
    <OwnerForm onHandleDelete={onHandleDelete} onHandleSubmit={updateOwner} owner={node}/>
  )
}

EditOwner.propTypes = {
  node: React.PropTypes.object.isRequired
}

EditOwner.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Relay.createContainer(EditOwner, {
  fragments: {
    node: _ => Relay.QL`
      fragment on Owner {
        id, name, email,
        address, postalCode,
        postalArea,
        contact {
          name, phoneNumber
        }
      }
    `
  }
})
