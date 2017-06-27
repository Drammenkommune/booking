import React from 'react'

const style = {
  display:'inline-block',
  padding: '16px 14px'
}

const Link = ({to, children}) => {
  return (
    <a style={style} href={to}>{children}</a>
  )
}

Link.propTypes = {
  to: React.PropTypes.string.isRequired,
  children: React.PropTypes.node
}

export default Link
