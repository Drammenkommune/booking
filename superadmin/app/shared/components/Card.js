import React from 'react'
import {Card} from 'material-ui'

import CardTitle from '@/components/CardTitle'

const CardContainer = ({children, title, subtitle, color, dividerColor, action, style, className}) => {
  return (
    <Card style={{marginBottom: 16, borderRadius: 3, ...style}} className={className}>
      {title
        ? (
          <CardTitle
            title={title} subtitle={subtitle} action={action}
            dividerColor={dividerColor} color={color}/>
        )
        : null
      }
      {children}
    </Card>
  )
}

CardContainer.propTypes = {
  children: React.PropTypes.node,
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  color: React.PropTypes.string,
  dividerColor: React.PropTypes.string,
  action: React.PropTypes.node,
  style: React.PropTypes.object,
  className: React.PropTypes.string
}

export default CardContainer
