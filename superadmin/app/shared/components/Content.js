import React from 'react'

const Content = ({children, style}) => {
  return (
    <div style={{padding: 16, ...style}}>
      {children}
    </div>
  )
}

Content.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
}

export default Content
