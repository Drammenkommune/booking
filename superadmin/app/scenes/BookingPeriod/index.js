import React from 'react'
import Relay from 'react-relay'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import ClearIcon from 'material-ui/svg-icons/content/clear'

import DateSelection from './DateSelection'
import UpdateSemesterMutation from './mutations/UpdateSemesterMutation'
import {mutate} from '~/services'
import {Card, CardActionButton, Content, GridContainer} from '@/components'
import {theme} from '@/services'

class BookingPeriod extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editMode: false
    }
    this.updateSemester = ::this.updateSemester
    this.toggleEditMode = ::this.toggleEditMode
  }

  toggleEditMode() {
    this.setState({editMode: !this.state.editMode})
  }

  updateSemester({semesterStart, semesterEnd}) {
    const mutation = new UpdateSemesterMutation({
      semesterStart,
      semesterEnd,
      adminId: this.props.admin.id
    })
    mutate(mutation)
      .then(_ => this.setState({editMode: false}))
  }

  render() {
    const {admin} = this.props
    const {editMode} = this.state
    return (
      <GridContainer>
        <Card
          title="Bookingsperiode"
          dividerColor={theme.errorColor}
          action={(
            <CardActionButton
              icon={editMode ? <ClearIcon /> : <EditIcon />}
              onTouchTap={this.toggleEditMode}
              label={editMode ? 'Avbryt' : 'Rediger'} />
          )}
        >
          <Content>
            Registrer periode hvor lokaler kan bookes
            <DateSelection
              onHandleSubmit={this.updateSemester}
              editMode={editMode}
              start={admin.semesterStart}
              end={admin.semesterEnd}
            />
          </Content>
        </Card>
      </GridContainer>
    )
  }
}

BookingPeriod.propTypes = {
  admin: React.PropTypes.object.isRequired
}

export default Relay.createContainer(BookingPeriod, {
  fragments: {
    admin: _ => Relay.QL`
      fragments on Admin {
        id, semesterStart, semesterEnd
      }
    `
  }
})
