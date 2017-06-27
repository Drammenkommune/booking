import React from 'react'

const headerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  padding: '10px 2px 0px',
  borderTopRightRadius: 3,
  borderTopLeftRadius: 3
}

const defaultTitleStyle = {
  padding: '16px 14px 12px',
  fontWeight: 'bold'
}

const subtitleStyle = {
  width: '100%',
  padding: '0 16px 13px'
}

const CardTitle = ({title, subtitle, dividerColor, color, action}) => {
  const titleStyle = subtitle
    ? Object.assign({}, defaultTitleStyle, {padding: '16px 0 0 16px'})
    : defaultTitleStyle

  return (
    <div style={{
      ...headerStyle,
      borderBottom: `3px solid ${dividerColor}`,
      backgroundColor: color
    }}>
      <div>
        <h2 style={titleStyle}>{title}</h2>
        {subtitle ? <h4 style={subtitleStyle}>{subtitle}</h4> : null}
      </div>
      {action}
    </div>
  )
}

CardTitle.propTypes = {
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string,
  dividerColor: React.PropTypes.string,
  color: React.PropTypes.string,
  action: React.PropTypes.node
}

export default CardTitle
