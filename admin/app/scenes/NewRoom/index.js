import React from 'react'
import {RoomForm} from '~/components'

import AddRoomMutation from './mutations/AddRoomMutation'
import {theme, receipt} from '@/services'
import {PageTitle} from '@/components'

const NewRoom = (_, {router}) => {
  const onSubmitSuccess = () => {
    receipt.setType('newRoom')
    router.push('/kvittering')
  }
  return (
    <div>
      <PageTitle title="Registrer nytt lokale" dividerColor={theme.roomColor}/>
      <RoomForm
        onSubmitMutation={AddRoomMutation}
        onSubmitSuccess={onSubmitSuccess}
        submitLabel="Fullfør registrering"/>
    </div>
  )
}

NewRoom.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

export default NewRoom
