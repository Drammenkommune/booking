import React from 'react'
import {css, StyleSheet} from 'aphrodite'

import {Content, GridContainer, ListDivider} from '@/components'

const titleWrapper = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const styles = StyleSheet.create({
  title: {
    margin: '10px 0 16px',
    '@media (min-width: 760px)': {
      ':only-child': {
        width: '100%',
        textAlign: 'center'
      }
    }
  }
})

const PageTitle = ({title, subtitle, dividerColor = 'rgba(0, 0, 0, 0.12)', action}) => {
  return (
    <Content style={{paddingBottom: 0}}>
      <GridContainer padding={false}>
        <div style={titleWrapper}>
          <h1 className={css(styles.title)}>{title}</h1>
          {action}
        </div>
      </GridContainer>
      <ListDivider color={dividerColor} stretch={true}/>
      {subtitle
        ? (
          <GridContainer padding={false}>
            <p style={{margin: '16px 0'}}>{subtitle}</p>
          </GridContainer>)
        : null
      }
    </Content>
  )
}

PageTitle.propTypes = {
  title: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.string,
    React.PropTypes.node,
  ]),
  subtitle: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.string,
    React.PropTypes.node,
  ]),
  dividerColor: React.PropTypes.string,
  action: React.PropTypes.node
}

export default PageTitle
