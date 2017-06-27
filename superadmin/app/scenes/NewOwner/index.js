import React from 'react'

import AddOwnerMutation from './mutations/AddOwnerMutation'
import {OwnerForm} from '~/components'
import {mutate} from '~/services'

const NewOwner = (_, {router}) => {
  function createOwner(owner) {
    const mutation = new AddOwnerMutation(owner)
    mutate(mutation)
      .then(_ => router.push('/'))
  }

  return (
    <OwnerForm onHandleSubmit={createOwner}/>
  )
}

NewOwner.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default NewOwner
