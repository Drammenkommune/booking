import React from 'react'
import Relay from 'react-relay'

import {Content, ListDivider} from '@/components'
import {formatNewLines, theme} from '@/services'


const RoomInformation = ({room}) => {
  return room.info
    ? (
      <Content>
        <h2 style={{paddingBottom: 16}}>Viktig informasjon</h2>
        <ListDivider color={theme.roomColor} stretch={true} />
        <p>{formatNewLines(room.info)}</p>
      </Content>
    )
    : null
}

RoomInformation.propTypes = {
  room: React.PropTypes.object
}

export default Relay.createContainer(RoomInformation, {
  fragments: {
    room: () => Relay.QL`
      fragment on Room {
        info
      }
    `
  }
})
