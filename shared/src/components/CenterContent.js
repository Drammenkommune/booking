import React from 'react'

const CenterContent = ({children, vertical, horizontal = true}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: horizontal ? 'center' : 'initial',
      alignItems: vertical ? 'center' : 'initial'
    }}>
      {children}
    </div>
  )
}

CenterContent.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.array
  ]),
  vertical: React.PropTypes.bool,
  horizontal: React.PropTypes.bool
}

export default CenterContent
