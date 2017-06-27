import React from 'react'
import {List} from 'material-ui'

import Room from './Room'

const Rooms = ({rooms, footer, redirectUrl, disabled}) => {
  return (
    <div>
      {rooms.length
        ? <List style={{paddingTop: 0, paddingBottom: 0}}>
          {rooms.map(room => (
            <Room
              key={room.id}
              room={room}
              disabled={disabled}
              redirectUrl={redirectUrl}/>
          ))}
        </List>
        : <p style={{padding: 16}}>
          Ingen lokaler
        </p>
      }
      {footer}
    </div>
  )
}

Rooms.propTypes = {
  rooms: React.PropTypes.array,
  footer: React.PropTypes.node,
  redirectUrl: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool
}

export default Rooms
