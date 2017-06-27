import React from 'react'
import {RaisedButton} from 'material-ui'
import {fade} from 'material-ui/utils/colorManipulator'

const labelStyle = {
  textTransform: 'none',
  fontWeight: 'bold',
  padding: '10px 50px'
}

const FADE = 0.54

const PaddedButton = (props) => {
  const color = props.color && props.disabled
    ? fade(props.color, FADE)
    : props.color

  return (
    <RaisedButton
      {...props}
      labelStyle={color
        ? {...labelStyle, color}
        : labelStyle
      }/>
  )
}

PaddedButton.propTypes = {
  color: React.PropTypes.string,
  disabled: React.PropTypes.bool
}

export default PaddedButton
