import React from 'react'
import Relay from 'react-relay'
import moment from 'moment'
import {CircularProgress} from 'material-ui'

import {Overlay, TimeChooser} from '@/components'

const circularContainer = {
  display: 'flex',
  height: '100%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center'
}

class TimeChooserContainer extends React.Component {

  constructor(props) {
    super(props)
    this.onSelectTimeHandler = ::this.onSelectTimeHandler
    this.onWeekChange = ::this.onWeekChange
    this.onHandleRecurringCheck = ::this.onHandleRecurringCheck
  }

  componentWillReceiveProps({show}) {
    if (show && !this.props.show) {
      this.props.relay.forceFetch({
        start: moment().startOf('week').format('x').toString(),
        end: moment().endOf('week').add(1, 'seconds').format('x').toString(),
        recurring: false,
        recStart: null,
        recEnd: null
      })
    }
  }

  onSelectTimeHandler() {
    const roomId = this.props.room.id
    this.context.router.push(`/lokale/${roomId}/book`)
  }

  onWeekChange(start, end) {
    this.props.relay.forceFetch({start, end})
  }

  onHandleRecurringCheck(recurring, recStart, recEnd) {
    this.props.relay.forceFetch({recurring, recStart, recEnd})
  }


  render() {
    const {show, room} = this.props
    return show
      ? (
        <Overlay style={{display: 'block'}} onHandleClick={this.props.onHandleClose}>
          {room
            ? (
              <TimeChooser
                room={room}
                adminMode={true}
                onHandleClose={this.props.onHandleClose}
                onWeekChange={this.onWeekChange}
                onSelectTimeHandler={this.onSelectTimeHandler}
                onHandleRecurringCheck={this.onHandleRecurringCheck}/>
            )
            : (
              <div style={circularContainer}>
                <CircularProgress />
              </div>
            )
          }
        </Overlay>
      )
      : null
  }
}

TimeChooserContainer.propTypes = {
  show: React.PropTypes.bool,
  room: React.PropTypes.object,
  relay: React.PropTypes.object.isRequired,
  onHandleClose: React.PropTypes.func.isRequired,
}

TimeChooserContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

export default Relay.createContainer(TimeChooserContainer, {
  initialVariables: {
    start: moment().startOf('week').format('x').toString(),
    end: moment().endOf('week').add(1, 'seconds').format('x').toString(),
    recurring: false,
    recStart: null,
    recEnd: null
  },
  fragments: {
    room: () => Relay.QL`
      fragment on Room {
        id, name, ownerName, info,
        semesterStart, semesterEnd,
        contact {
          name, phoneNumber
        },
        bookings (start: $start, end: $end) {
          id,
          organization,
          recurring,
          events (start: $start, end: $end) { id, start, end },
        },
        unavailableDates(start: $start, end: $end) {
          id, startDate, endDate
        },
        recurringBookings(start: $recStart, end: $recEnd) @include(if: $recurring) {
          id, status
        },
      }
    `
  }
})
