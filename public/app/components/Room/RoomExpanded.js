import React from 'react'

import {
  BoldText, Content, ListDivider,
  PaddedButton, RoomFacilities
} from '@/components'
import {formatNewLines, theme, mapLink} from '@/services'

const titleStyle = {
  fontWeight: 'bold',
  marginBottom: 16
}

const buttonContainerStyle = {
  width: '100%', display: 'flex',
  justifyContent: 'center',
  marginTop: 16
}

const RoomExpanded = ({info, contact, facilities, size, maxPeople, address, onHandleBook}) => {
  return (
    <div>
      <RoomFacilities
        size={size}
        facilities={facilities}
        maxPeople={maxPeople}/>
      <Content>
        <h2 style={titleStyle}>Viktig informasjon</h2>
        <ListDivider color={theme.roomColor} stretch={true} />
        <p>{formatNewLines(info) || '-'}</p>
        <h2 style={titleStyle}>Skolens kontaktinfo</h2>
        <ListDivider color={theme.roomColor} stretch={true} />
        <p><BoldText>Kontaktperson: </BoldText>{contact.name}, {contact.phoneNumber}</p>
        <p onTouchTap={(e) => { e.preventDefault(); e.stopPropagation() }}>
          <BoldText>Adresse: </BoldText>
          <a href={mapLink(address)} target="_blank">{address}</a>
        </p>
        <div style={buttonContainerStyle}>
          <PaddedButton
            label="Book"
            backgroundColor={theme.roomColor}
            onTouchTap={onHandleBook}/>
        </div>
      </Content>
    </div>
  )
}

RoomExpanded.propTypes = {
  info: React.PropTypes.string,
  contact: React.PropTypes.object,
  facilities: React.PropTypes.array,
  size: React.PropTypes.number,
  maxPeople: React.PropTypes.number,
  address: React.PropTypes.string,
  onHandleBook: React.PropTypes.func.isRequired,
}

export default RoomExpanded
