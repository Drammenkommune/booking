import React from 'react'

const StretchView = ({children, offset = 0}) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: `calc(100vh - ${offset}px)`
  }

  return (
    <div style={style}>
      {children}
    </div>
  )
}

StretchView.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.node
  ]),
  offset: React.PropTypes.number
}

export default StretchView
