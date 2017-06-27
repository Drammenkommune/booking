import React from 'react'
import Relay from 'react-relay'

import {BoldText, Content, ListDivider} from '@/components'
import {theme, mapLink} from '@/services'

const RoomContact = ({room}) => {
  return room.contact
    ? (
      <Content>
        <h2 style={{paddingBottom: 16}}>Skolens kontaktinfo</h2>
        <ListDivider color={theme.roomColor} stretch={true}/>
        <p>
          <BoldText>Kontaktperson: </BoldText>
          {room.contact.name}, {room.contact.phoneNumber}
        </p>
        <p>
          <BoldText>Adresse: </BoldText>
          <a href={mapLink(room.address)} target="_blank">{room.address}</a>
        </p>
      </Content>
    )
    : null
}

RoomContact.propTypes = {
  room: React.PropTypes.object
}

export default Relay.createContainer(RoomContact, {
  fragments: {
    room: () => Relay.QL`
      fragment on Room {
        address,
        contact {
          name, phoneNumber
        }
      }
    `
  }
})
