import React from 'react'
import Relay from 'react-relay'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'

import {Card, CardActionButton, GridContainer} from '@/components'
import {theme} from '@/services'
import RoomDetails from './RoomDetails'
import RoomBookings from './RoomBookings'
import {TimeChooserContainer} from '~/components'

class Room extends React.Component {
  state = {
    timeChooser: false
  }

  constructor(props) {
    super(props)
    this.onHandleBooking = ::this.onHandleBooking
    this.onHandleClose = ::this.onHandleClose
  }

  onHandleBooking() {
    this.setState({timeChooser: true})
  }

  onHandleClose() {
    this.setState({timeChooser: false})
  }

  render() {
    const {room} = this.props
    const {timeChooser} = this.state
    const editLink = `/admin/#/lokale/${room.id}/rediger`

    return (
      <div>
        <TimeChooserContainer
          show={timeChooser} room={room}
          onHandleClose={this.onHandleClose}/>
        <GridContainer>
          <div>
            <Card
              title={room.name}
              color={theme.roomColor}
              action={(
                <CardActionButton
                  href={editLink}
                  label="Rediger"
                  icon={<EditIcon/>}
                  disableTouchRipple={true}
                  aria-label="Rediger lokale"/>
              )}>
              <RoomDetails room={room} onHandleBooking={this.onHandleBooking}/>
            </Card>
          </div>
          <div>
            <Card title={`Bookinger på ${room.name}`} color={theme.bookingColor}>
              <RoomBookings room={room}/>
            </Card>
          </div>
        </GridContainer>
      </div>
    )
  }
}

Room.propTypes = {
  room: React.PropTypes.object
}

export default Relay.createContainer(Room, {
  fragments: {
    room: _ => Relay.QL`
      fragment on Room {
        id, name
        ${RoomDetails.getFragment('room')}
        ${RoomBookings.getFragment('room')}
        ${TimeChooserContainer.getFragment('room')}
      }
    `,
  },
})
