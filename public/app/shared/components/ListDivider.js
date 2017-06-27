import React from 'react'

const ListDivider = ({color = 'grey', stretch = false}) => {
  const style = {
    borderTop: `3px solid ${color}`,
    borderBottom: 0,
    height: 1,
    margin: stretch ? '0 -16px' : 0
  }
  return (
    <hr style={style}/>
  )
}

ListDivider.propTypes = {
  color: React.PropTypes.string,
  stretch: React.PropTypes.bool
}

export default ListDivider
