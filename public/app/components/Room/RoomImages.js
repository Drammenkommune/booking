import React from 'react'

import {PicturePlaceholder} from '@/icons'
import {RoomImage} from '@/components'

const imageStyle = {
  width: 'calc(33% - 10px)',
  height: 'calc(33vw - 45px)',
  maxWidth: 150,
  maxHeight: 150,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat'
}

const placeholderContainer = {height: 'calc(33vw)', maxHeight: 182, padding: 16}
const placeholder = {
  height: '100%',
  maxHeight: placeholderContainer.maxHeight - (placeholderContainer.padding * 2)
}

const RoomImages = ({images}) => {
  return images.length
    ? (
      <div style={{
        display: 'flex', flexWrap: 'wrap',
        justifyContent: 'space-between', padding: 16
      }}>
        {images.map(image => (
          <RoomImage key={image.id} thumbnailUrl={image.thumbnail} imageUrl={image.url} style={imageStyle}/>
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
  images: React.PropTypes.array
}

export default RoomImages
