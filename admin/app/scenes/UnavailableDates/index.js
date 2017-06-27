import React from 'react'
import Relay from 'react-relay'
import {List, ListItem, IconButton} from 'material-ui'
import RemoveIcon from 'material-ui/svg-icons/content/clear'

import UnavailableDatePicker from './UnavailableDatePicker'
import {Card, GridContainer, PageTitle} from '@/components'
import {theme} from '@/services'
import {mutate} from '~/services'
import {
  AddUnavailableDateToOwnerMutation,
  RemoveUnavailableDateFromOwnerMutation
} from './mutations'
// Required for Safari
require('intl/locale-data/jsonp/nb')

const listStyle = {
  maxWidth: 260,
  paddingBottom: 0,
  paddingLeft: 20
}

class UnavailableDates extends React.Component {

  state = {
    date: null
  }

  constructor(props) {
    super(props)
    this.addDate = ::this.addDate
    this.removeDate = ::this.removeDate
  }

  addDate(startDate, endDate) {
    const alreadyInList = this.props.owner.unavailableDates
      .find(unavailableDate => {
        return unavailableDate.date === startDate
          || unavailableDate.date === `${startDate} - ${endDate}`
      })
    if (!alreadyInList) {
      mutate(new AddUnavailableDateToOwnerMutation({
        startDate, endDate,
        ownerId: this.props.owner.id
      }))
    }
  }

  removeDate(dateId) {
    mutate(new RemoveUnavailableDateFromOwnerMutation({
      dateId,
      ownerId: this.props.owner.id
    }))
  }

  formatDateText(startDate, endDate) {
    return endDate
      ? `${startDate} - ${endDate}`
      : startDate
  }

  render() {
    // While running the remove date mutation, the array will contain a `null`
    const dates = this.props.owner.unavailableDates
      .filter(date => date !== null)
    return (
      <div>
        <PageTitle
          title="Utilgjengelige datoer"
          subtitle="Legg til de datoene skolens lokaler er utilgjengelige. For å legge til tidsperiode, legg til sluttdato i tillegg."
          dividerColor={theme.errorColor} />
        <GridContainer>
          <div>
            <Card title="Legg til datoer" dividerColor={theme.errorColor}>
              <UnavailableDatePicker onAddDate={this.addDate}/>
              <hr />
              <List style={listStyle}>
                {dates.map(({id, startDate, endDate}) => (
                  <ListItem
                    key={id} primaryText={this.formatDateText(startDate, endDate)}
                    rightIconButton={(
                      <IconButton
                        aria-label="Fjern utilgjengelig dato"
                        onTouchTap={() => this.removeDate(id)}>
                        <RemoveIcon />
                      </IconButton>
                    )}/>
                ))}
              </List>
            </Card>
          </div>
        </GridContainer>
      </div>
    )
  }
}

UnavailableDates.propTypes = {
  owner: React.PropTypes.object.isRequired
}

export default Relay.createContainer(UnavailableDates, {
  fragments: {
    owner: () => Relay.QL`
      fragment on Owner {
        id, name,
        unavailableDates {id, startDate, endDate}
      }
    `
  }
})
