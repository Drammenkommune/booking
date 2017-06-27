import React from 'react'
import {
  BoldText, Card, CardTitle, Content,
  InlineText, ValidationInput
} from '@/components'
import {theme, mapLink} from '@/services'


const LocationAndComment = ({room, showComment}) => {
  return (
    <Card title="Sted" style={{width: '100%'}} dividerColor={theme.roomColor}>
      <Content>
        <InlineText>{room.ownerName}, {room.name}</InlineText>
        <p>
          <BoldText>Adresse: </BoldText>
          <a href={mapLink(room.address)} target="_blank">{room.address}</a>
        </p>
      </Content>
      {showComment && (
        <div>
          <CardTitle title="Tilleggsinformasjon" dividerColor={theme.roomColor}/>
          <Content>
            <ValidationInput
              name="userComment"
              style={{marginTop: 0, minHeight: 150}}
              maxLength="400"
              placeholder="Har du andre opplysninger som er viktige for oss? (maks 400 tegn)"
              multiLine={true}/>
          </Content>
        </div>
      )}
    </Card>
  )
}

LocationAndComment.propTypes = {
  room: React.PropTypes.object.isRequired,
  showComment: React.PropTypes.bool.isRequired
}

export default LocationAndComment
