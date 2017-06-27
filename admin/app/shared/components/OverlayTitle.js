import React from 'react'

import ListDivider from '@/components/ListDivider'
import Content from '@/components/Content'

const ellipsis = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

const container = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end'
}

const subtitleStyle = {
  fontSize: 18,
  fontWeight: 'bold',
  margin: '16px 0 0'
}

const OverlayTitle = ({title, subtitle, action, dividerColor = 'grey'}) => {
  return (
    <div>
      <Content style={container}>
        <div style={{width: action ? 'calc(100% - 24px)' : '100%'}}>
          <h1
            id="overlay-title"
            style={{...ellipsis, margin: subtitle ? '10px 0 16px' : '10px 0 0'}}>
            {title}
          </h1>
          {subtitle
            ? (<p style={{...ellipsis, ...subtitleStyle}}>{subtitle}</p>)
            : null
          }
        </div>
        {action ? action : null}
      </Content>
      <ListDivider color={dividerColor}/>
    </div>
  )
}

OverlayTitle.propTypes = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  action: React.PropTypes.node,
  dividerColor: React.PropTypes.string
}

export default OverlayTitle
