import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import {IconButton} from 'material-ui'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import {Card, Content, Overlay} from '@/components'

const styles = StyleSheet.create({
  card: {
    maxHeight: 'calc(100% - 40px)',
    maxWidth: 'calc(100% - 40px)',
    margin: 0,
    '@media (max-width: 480px)': {
      borderRadius: 0,
      position: 'absolute',
      maxWidth: '100%',
      maxHeight: '100%',
      height: '100%',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0
    }
  },
  tallCard: {
    height: 'calc(100% - 40px)'
  }
})

function getImageDimensions(url) {
  const image = document.createElement('img')
  image.src = url
  return {
    height: image.naturalHeight,
    width: image.naturalWidth
  }
}

const ImageOverlay = ({imageUrl, onHandleOverlayClick}) => {
  const dimensions = getImageDimensions(imageUrl)
  const tall = dimensions.height >= dimensions.width
  const imageStyle = tall
    ? {
      maxWidth: '100%',
      maxHeight: 'calc(100% - 58px)',
      height: 'auto'
    }
    : {
      maxWidth: '100%',
      maxHeight: 'calc(100% - 58px)',
      width: 'auto'
    }
  const contentStyle = tall
    ? {display: 'flex', justifyContent: 'center', height: '100%'}
    : {display: 'flex', justifyContent: 'center'}
  return (
    <Overlay onHandleClick={onHandleOverlayClick}>
      <Card
        title=" "
        className={css(styles.card, tall && styles.tallCard)}
        action={(
          <IconButton
            aria-label="Lukk fullskjermsvisning av bilde"
            onTouchTap={onHandleOverlayClick}>
            <CloseIcon />
          </IconButton>
        )}>
        <Content style={contentStyle}>
          <img alt="Bilde av lokalet" src={imageUrl} style={imageStyle} />
        </Content>
      </Card>
    </Overlay>
  )
}

ImageOverlay.propTypes = {
  imageUrl: React.PropTypes.string.isRequired,
  onHandleOverlayClick: React.PropTypes.func.isRequired
}

export default ImageOverlay
