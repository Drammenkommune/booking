import React from 'react'

import theme from '@/services/theme'

const defaultStyle = {
  color: theme.linkColor,
  textDecoration: 'underline',
  cursor: 'pointer',
  padding: 0,
  border: 0,
  backgroundColor: 'transparent'
}

const ActionLink = ({onTouchTap, style, className, children}) => {
  const onKeyPressHandler = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onTouchTap()
    }
  }

  return (
    <button
      className={className}
      style={{...defaultStyle, ...style}}
      onKeyPress={onKeyPressHandler}
      onTouchTap={onTouchTap}>
      <p style={{margin: 0}}>{children}</p>
    </button>
  )
}

ActionLink.propTypes = {
  onTouchTap: React.PropTypes.func,
  style: React.PropTypes.object,
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default ActionLink
