import React from 'react'

const InlineText = ({style, children, className}) => {
  return (
    <p className={className} style={{margin: 0, lineHeight: '18px', ...style}}>
      {children}
    </p>
  )
}

InlineText.propTypes = {
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.string,
    React.PropTypes.node
  ])
}

export default InlineText
