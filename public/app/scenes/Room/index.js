import React from 'react'
import Relay from 'react-relay'

import {Room, TimeChooserContainer} from '~/components'
import {GridContainer} from '@/components'

class RoomContainer extends React.Component {

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

    return (
      <div>
        <TimeChooserContainer
          room={room} show={timeChooser}
          onHandleClose={this.onHandleClose}/>
        <GridContainer>
          <div>
            <Room
              room={room}
              alwaysExpanded={true}
              onHandleBooking={this.onHandleBooking}/>
          </div>
        </GridContainer>
      </div>
    )
  }
}

RoomContainer.propTypes = {
  room: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired,
}

export default Relay.createContainer(RoomContainer, {
  fragments: {
    room: () => Relay.QL`
      fragment on Room {
        ${Room.getFragment('room')}
        ${TimeChooserContainer.getFragment('room')}
      }
    `
  }
})
