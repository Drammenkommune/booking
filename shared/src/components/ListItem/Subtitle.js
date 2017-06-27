import React from 'react'
import styles from './styles'

const iconContainer = {
  display: 'flex',
  alignItems: 'flex-end',
  marginLeft: 6,
  marginTop: 3,
  color: 'rgba(0, 0, 0, 0.54)'
}

const Subtitle = ({title, style, icons}) => {
  const text = (
    <p style={Object.assign({}, style, styles)} title={title}>
      {title}
    </p>
  )

  return icons
    ? (
      <div style={{display: 'flex', alignItems: 'center'}}>
        {text}
        <span style={iconContainer}>{icons}</span>
      </div>
    )
    : text
}

Subtitle.propTypes = {
  title: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.string,
    React.PropTypes.node
  ]),
  style: React.PropTypes.object,
  icons: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.string,
    React.PropTypes.node
  ])
}

export default Subtitle
