import React from 'react'

const BoldText = ({children, fontSize = 16, style}) => {
  return (<span style={{fontSize, fontWeight: 'bold', ...style}}>{children}</span>)
}

BoldText.propTypes = {
  children: React.PropTypes.node,
  fontSize: React.PropTypes.number,
  style: React.PropTypes.object
}

export default BoldText
