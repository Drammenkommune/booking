import React from 'react'
import {RaisedButton} from 'material-ui'
import {theme} from '@/services'

const bigButton = {
  width: '100%',
  maxWidth: 480,
  height: 70
}

const buttonLabel = {
  color: 'white',
  textTransform: 'none',
  fontSize: 20, lineHeight: '70px',
  fontWeight: 'bold'
}

const BigButton = ({label, href}) => {
  return (
    <RaisedButton
      href={href}
      label={label}
      style={bigButton}
      labelStyle={buttonLabel}
      backgroundColor={theme.submitColor}/>
  )
}

BigButton.propTypes = {
  label: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.node
  ]),
  href: React.PropTypes.string
}

export default BigButton
