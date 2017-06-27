import React from 'react'
import Relay from 'react-relay'
import {File} from 'formsy-react-components'
import {CircularProgress, IconButton} from 'material-ui'
import AddIcon from 'material-ui/svg-icons/content/add'
import ClearIcon from 'material-ui/svg-icons/content/clear'

import {Card, Content} from '@/components'
import {theme, rotateAndResizeImage} from '@/services'

if (!window.fetch) {
  window.fetch = require('whatwg-fetch')
}

const clearContainerStyle = {
  position: 'absolute',
  height: 24, width: 24,
  top: 5, right: 5,
  cursor: 'pointer',
  display: 'flex', justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.4)'
}

const imageStyle = {
  width: 'calc(50% - 10px)',
  marginBottom: 20,
  position: 'relative',
}

class ImagesForm extends React.Component {
  constructor(props) {
    super(props)
    this.getSignedUrl = ::this.getSignedUrl
    this.getImageUrl = ::this.getImageUrl
    this.uploadFile = ::this.uploadFile
    this.handleFileChange = ::this.handleFileChange
    this.state = {
      loadingImages: []
    }
  }

  getSignedUrl(filename, filetype) {
    return new Promise((resolve) => {
      const query = Relay.createQuery(Relay.QL`
        query {
          owner {
            uploadUrl(filename: $filename, filetype: $filetype)
          }
        }
      `, {filename, filetype})
      Relay.Store.primeCache({query}, readyState => {
        if (readyState.done) {
          const data = Relay.Store.readQuery(query)[0]
          resolve(data.uploadUrl)
        }
      })
    })
  }

  getImageUrl(urlWithQuery) {
    return urlWithQuery.substring(0, urlWithQuery.indexOf('?'))
  }

  uploadFile(file, thumbnail) {
    const filename = thumbnail ? `${file.name}-thumb` : file.name
    const filetype = file.type
    let imageUrl = ''
    return this.getSignedUrl(filename, filetype)
      .then((url) => {
        imageUrl = this.getImageUrl(url)
        return fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': filetype,
          },
          body: file
        })
      })
      .then(_ => imageUrl)
  }

  handleFileChange(_, fileList) {
    if (fileList && fileList.length > 0) {
      const loadingImages = [...this.state.loadingImages, <CircularProgress key={this.state.loadingImages.length}/>]
      this.setState({loadingImages})
      const bigImageSize = {maxWidth: 1280, maxHeight: 720}
      const thumbnailSize = {maxWidth: 420, maxHeight: 240}
      let bigSizeUrl = null
      rotateAndResizeImage(fileList[0], bigImageSize.maxWidth, bigImageSize.maxHeight)
        .then(this.uploadFile)
        .then(url => { bigSizeUrl = url })
        .then(_ => rotateAndResizeImage(fileList[0], thumbnailSize.maxWidth, thumbnailSize.maxHeight))
        .then(file => this.uploadFile(file, true))
        .then(thumbnailUrl => {
          const loadingImages = this.state.loadingImages.slice(0, -1)
          this.setState({loadingImages})
          return this.props.onImageSelect(bigSizeUrl, thumbnailUrl)
        })
    }
  }

  render() {
    const {images, onImageRemove} = this.props

    const addImageAction = (
      <div>
        <label
          htmlFor="image-files"
          style={{
            height: 48, width: 48,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
          <IconButton
            aria-label="Last opp bilde"
            disableTouchRipple={true}
            onTouchTap={() => { document.getElementById('image-files').click() }}
            style={{pointerEvents: 'none'}}>
            <AddIcon style={{margin: 'auto'}}/>
          </IconButton>
        </label>
        <File
          id="image-files"
          style={{display: 'none'}}
          layout="elementOnly"
          name="image"
          onChange={this.handleFileChange}/>
      </div>
    )

    return (
      <Card
        title="Bilder" action={addImageAction}
        dividerColor={theme.roomColor} style={{width: '100%'}}>
        <Content style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {
            images.map(({url}, index) => {
              return (
                <div key={index} style={imageStyle}>
                  <div style={clearContainerStyle}>
                    <ClearIcon
                      style={{width: 20, color: '#FFFFFF' }}
                      onTouchTap={() => {
                        onImageRemove(url)
                      }}
                    />
                  </div>
                  <img src={url} style={{width: '100%'}}/>
                </div>
              )
            })
          }
          {
            this.state.loadingImages.map((image, index) => {
              return (
              <div key={index} style={{
                ...imageStyle,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {image}
              </div>
              )
            })
          }
        </Content>
      </Card>
    )
  }
}

ImagesForm.propTypes = {
  images: React.PropTypes.array,
  onImageSelect: React.PropTypes.func.isRequired,
  onImageRemove: React.PropTypes.func.isRequired,
}

export default ImagesForm
