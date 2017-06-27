import React from 'react'
import Relay from 'react-relay'

import {PicturePlaceholder} from '@/icons'
import {RoomImage} from '@/components'

const placeholderContainer = {height: 'calc(33vw)', maxHeight: 182, padding: 16}
const placeholder = {
  height: '100%',
  maxHeight: placeholderContainer.maxHeight - (placeholderContainer.padding * 2)
}
const imageStyle = {
  width: 'calc(33% - 10px)',
  height: 'calc(33vw - 45px)',
  maxWidth: 150,
  maxHeight: 150,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat'
}

const RoomImages = ({room}) => {
  const {images} = room
  return images.length
    ? (
      <div style={{
        display: 'flex', flexWrap: 'wrap',
        justifyContent: 'space-between', padding: 16}}>
        {images.map(({id, thumbnail, url}) => (
          <RoomImage key={id} thumbnailUrl={thumbnail} imageUrl={url} style={imageStyle}/>
        ))}
      </div>
    )
    : (
      <div style={placeholderContainer}>
        <PicturePlaceholder style={placeholder}/>
      </div>
    )
}

RoomImages.propTypes = {
  room: React.PropTypes.object.isRequired
}

export default Relay.createContainer(RoomImages, {
  fragments: {
    room: () => Relay.QL`
      fragment on Room {
        images {
          id, url, thumbnail
        }
      }
    `
  }
})
