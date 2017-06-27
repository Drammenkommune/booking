import React from 'react'

import {ActionLink, GridContainer, PageTitle} from '@/components'

const ActionConfirm = ({title, subtitle, redirect, dividerColor, action}) => {
  return (
    <div>
      <PageTitle
        title={title} subtitle={subtitle}
        dividerColor={dividerColor} action={action} />
      <GridContainer>
        <ActionLink onTouchTap={redirect} style={{marginTop: -16}}>
          Tilbake til dine bookinger
        </ActionLink>
      </GridContainer>
    </div>
  )
}

ActionConfirm.propTypes = {
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node,
    React.PropTypes.array
  ]),
  action: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node,
    React.PropTypes.array
  ]),
  redirect: React.PropTypes.func.isRequired,
  dividerColor: React.PropTypes.string,
}

export default ActionConfirm
