import React from 'react'
import Relay from 'react-relay'
import MediaQuery from 'react-responsive'

import {Room, TimeChooserContainer} from '~/components'
import {GridContainer} from '@/components'
import {alphabeticSort} from '@/services'
import SearchFilter from './SearchFilter'
import ResultMode from './ResultMode'
import ListResults from './ListResults'

class Rooms extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      timeChooser: false,
      room: null,
      mode: 'grid'
    }
    this.onHandleBooking = ::this.onHandleBooking
    this.onHandleClose = ::this.onHandleClose
    this.onHandleOwnerFilter = ::this.onHandleOwnerFilter
    this.onHandleRoomTypeFilter = ::this.onHandleRoomTypeFilter
    this.onChangeMode = ::this.onChangeMode
  }

  onHandleBooking(room) {
    this.props.relay.forceFetch({roomId: room.id, findRoom: true})
    this.setState({timeChooser: true, room})
  }

  onHandleClose() {
    this.props.relay.forceFetch({roomId: null, findRoom: false})
    this.setState({timeChooser: false, room: null})
  }

  onHandleOwnerFilter(ownerId) {
    this.props.relay.forceFetch({ownerId})
  }

  onHandleRoomTypeFilter(roomType) {
    this.props.relay.forceFetch({roomType})
  }

  onChangeMode(mode) {
    this.setState({mode})
  }

  render() {
    const {rooms, room, owners} = this.props.searchResult
    const {timeChooser} = this.state

    return (
      <div>
        <TimeChooserContainer
          show={timeChooser} room={room || null}
          onHandleClose={this.onHandleClose}/>
        <SearchFilter
          owners={owners}
          onHandleOwnerFilter={this.onHandleOwnerFilter}
          onHandleRoomTypeFilter={this.onHandleRoomTypeFilter}/>
        <div style={{padding: '0 20px'}}>
          <GridContainer padding={false}>
            <div>
              <h3 style={{marginTop: 8}}>
                {rooms.length} {rooms.length === 1 ? 'lokale' : 'lokaler'}
              </h3>
            </div>
            <div>
              <MediaQuery query="(min-width: 760px)">
                <ResultMode onChangeMode={this.onChangeMode}/>
              </MediaQuery>
            </div>
          </GridContainer>
        </div>
        {this.state.mode === 'grid'
          ? (
            <GridContainer>
              {rooms.length
                ? alphabeticSort(rooms, 'ownerName').map((room, index) => (
                  <div key={index} style={{margin: '8px 0'}}>
                    <Room key={room.id} room={room} onHandleBooking={this.onHandleBooking}/>
                  </div>
                ))
                : <p>Ingen resultater</p>
              }
            </GridContainer>
          )
          : (
            <ListResults rooms={rooms.length ? rooms.sort(this.ownerNameSort) : []} onHandleBooking={this.onHandleBooking}/>
          )
        }
      </div>
    )
  }
}

Rooms.propTypes = {
  searchResult: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired,
}

Rooms.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Relay.createContainer(Rooms, {
  initialVariables: {
    roomId: null,
    findRoom: false,
    ownerId: null,
    roomType: null
  },
  fragments: {
    searchResult: () => Relay.QL`
      fragment on Search {
        rooms(q: "*", ownerId: $ownerId, roomType: $roomType) {
          id, name,
          ownerName,
          address,
          images {
            id, url, thumbnail
          },
          type,
          size,
          maxPeople,
          facilities,
          info,
          contact {
            phoneNumber, name
          },
          ${Room.getFragment('room')}
        }
        room(roomId: $roomId) @include(if: $findRoom) {
          ${TimeChooserContainer.getFragment('room')}
        },
        owners {
          id, name
        }
      }
    `
  }
})
