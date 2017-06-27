import React from 'react'

import ImageOverlay from './ImageOverlay'

class RoomImage extends React.Component {

  state = {
    showOverlay: false
  }

  constructor(props) {
    super(props)
    this.showImageOverlay = ::this.showImageOverlay
    this.hideImageOverlay = ::this.hideImageOverlay
    this.handleKeyPress = ::this.handleKeyPress
  }

  handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.showImageOverlay(event)
    }
  }

  showImageOverlay(event) {
    event.preventDefault()
    event.stopPropagation()
    this.setState({showOverlay: true})
  }

  hideImageOverlay(event) {
    event.preventDefault()
    event.stopPropagation()
    this.setState({showOverlay: false})
  }

  render() {
    return (
      <div style={this.props.style}>
        <div
          onTouchTap={this.showImageOverlay}
          onKeyPress={this.handleKeyPress}
          tabIndex="0"
          style={{
            cursor: 'pointer', height: '100%', width: '100%',
          }}>
          <img
            src={this.props.thumbnailUrl}
            alt="Bilde av lokalet"
            style={{maxWidth: '100%', maxHeight: '100%'}}/>
        </div>
        {this.state.showOverlay && (
          <ImageOverlay
            imageUrl={this.props.imageUrl}
            onHandleOverlayClick={this.hideImageOverlay}/>
        )}
      </div>
    )
  }
}

RoomImage.propTypes = {
  imageUrl: React.PropTypes.string.isRequired,
  thumbnailUrl: React.PropTypes.string.isRequired,
  style: React.PropTypes.object
}

export default RoomImage
