import React from 'react'

import {ActionConfirm} from '@/components'
import {theme} from '@/services'

const NoAccess = (_, {router}) => {
  const onHandleRedirect = () => {
    router.replace('/')
  }

  return (
    <ActionConfirm
      title="Ikke funnet"
      dividerColor={theme.errorColor}
      redirect={onHandleRedirect}/>)
}

NoAccess.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default NoAccess
