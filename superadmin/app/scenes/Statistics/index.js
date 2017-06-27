import React from 'react'
import Relay from 'react-relay'

import DateSelection from './DateSelection'
import {Card, Content, GridContainer} from '@/components'
import {theme} from '@/services'

const Statistics = ({admin}) => {
  const {semesterStart, semesterEnd} = admin
  return (
    <GridContainer>
      <Card title="Statistikk" dividerColor={theme.errorColor}>
        <Content>
          Velg periode for uthenting av statistikk
          <DateSelection semesterStart={semesterStart} semesterEnd={semesterEnd}/>
        </Content>
      </Card>
    </GridContainer>
  )
}

Statistics.propTypes = {
  admin: React.PropTypes.object.isRequired
}

export default Relay.createContainer(Statistics, {
  fragments: {
    admin: _ => Relay.QL`
      fragments on Admin {
        semesterStart, semesterEnd
      }
    `
  }
})
