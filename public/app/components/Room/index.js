import React from 'react'
import Relay from 'react-relay'
import {IconButton} from 'material-ui'
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down'

import {Card, PaddedButton, ListDivider} from '@/components'
import {theme, roomTypes} from '@/services'

import RoomImages from './RoomImages'
import RoomFacilities from './RoomFacilities'
import RoomInfo from './RoomInfo'
import RoomExpanded from './RoomExpanded'

class Room extends React.Component {

  state = {
    expanded: false
  }

  constructor(props) {
    super(props)
    this.toggleExpand = ::this.toggleExpand
    this.handleBooking = ::this.handleBooking
  }

  toggleExpand() {
    this.setState({expanded: !this.state.expanded})
  }

  handleBooking(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onHandleBooking(this.props.room)
  }

  render() {
    const {room, alwaysExpanded} = this.props
    const {expanded} = this.state

    const expandAction = alwaysExpanded
      ? null
      : (
        <IconButton
          aria-label={expanded ? 'Kollaps romkort' : 'Ekspander romkort'}
          onTouchTap={this.toggleExpand}
          style={{transform: expanded ? 'rotate(-180deg)' : 'rotate(0deg)'}}>
          <DownArrow/>
        </IconButton>
      )

    return (
      <div onTouchTap={alwaysExpanded ? null : this.toggleExpand} style={{cursor: 'pointer'}}>
        <Card
          key={room.id}
          title={room.ownerName}
          subtitle={`${room.name} (${roomTypes[room.type]})`}
          color={theme.roomColor}
          action={expandAction}>
          <RoomImages images={room.images} roomName={room.name} />
          <ListDivider color={theme.roomColor} />
          {expanded || alwaysExpanded
            ? (
              <RoomExpanded
                info={room.info}
                contact={room.contact}
                facilities={room.facilities}
                size={room.size}
                maxPeople={room.maxPeople}
                address={room.address}
                onHandleBook={this.handleBooking}/>
            )
            : (
              <div>
                <RoomFacilities facilities={room.facilities} />
                <div style={{display: 'flex', padding: '0 16px'}}>
                  <RoomInfo size={room.size} maxPeople={room.maxPeople} />
                  <div style={{
                    width: '50%', display: 'flex', paddingBottom: 16,
                    alignItems: 'flex-end', justifyContent: 'flex-end'
                  }}>
                    <PaddedButton
                      label="Book"
                      backgroundColor={theme.roomColor}
                      onTouchTap={this.handleBooking}/>
                  </div>
                </div>
              </div>
            )
          }
        </Card>
      </div>
    )
  }
}

Room.propTypes = {
  room: React.PropTypes.object.isRequired,
  alwaysExpanded: React.PropTypes.bool,
  onHandleBooking: React.PropTypes.func.isRequired
}

export default Relay.createContainer(Room, {
  fragments: {
    room: () => Relay.QL`
      fragment on Room {
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
        }
      }
    `
  }
})
