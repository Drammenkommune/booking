import React from 'react'
import {Card, CardTitle, Content, InlineText} from '@/components'
import {formatNewLines, theme} from '@/services'

const RoomInfo = ({room}) => {
  return (
    <Card title="Viktig informasjon" style={{width: '100%'}} dividerColor={theme.roomColor}>
      <Content>
        <InlineText>{formatNewLines(room.info)}</InlineText>
      </Content>
      <CardTitle title="Skolens kontaktinfo" dividerColor={theme.roomColor}/>
      <Content>
        <InlineText>{room.contact.name}, {room.contact.phoneNumber}</InlineText>
      </Content>
    </Card>
  )
}

RoomInfo.propTypes = {
  room: React.PropTypes.object.isRequired
}

export default RoomInfo
