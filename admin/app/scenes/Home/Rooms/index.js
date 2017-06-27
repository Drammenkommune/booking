import React from 'react'
import Relay from 'react-relay'

import Rooms from './Rooms'

const RoomsContainer = ({owner, disabled}) => (
  <Rooms rooms={owner.rooms} disabled={disabled}/>
)

RoomsContainer.propTypes = {
  owner: React.PropTypes.object,
  disabled: React.PropTypes.bool
}

export default Relay.createContainer(RoomsContainer, {
  fragments: {
    owner: _ => Relay.QL`
      fragment on Owner {
        rooms {
          id, name,
          images { url, thumbnail }
        }
      }
    `
  }
})
