import React from 'react'

import styles from './styles'

const Title = (props) => {
  const {title, centered, style} = props
  const titleStyle = centered
    ? Object.assign({}, style, {...styles, marginTop: 8, marginBottom: -8})
    : Object.assign({}, style, styles)

  return (<h4 style={titleStyle} title={title}>{title}</h4>)
}

Title.propTypes = {
  title: React.PropTypes.string,
  centered: React.PropTypes.bool,
  style: React.PropTypes.object
}

export default Title
