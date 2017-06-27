import React from 'react'
import ListItem from './ListItem'

import {alphabeticSort} from '@/services'

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 20px'
  }
}

const ListResults = ({rooms, onHandleBooking}) => {
  return (
    <div style={styles.container}>
      {alphabeticSort(rooms, 'ownerName').map(room => (
        <ListItem key={room.id} room={room} onHandleBooking={onHandleBooking}/>
      ))}
    </div>
  )
}

ListResults.propTypes = {
  rooms: React.PropTypes.array,
  onHandleBooking: React.PropTypes.func.isRequired
}

export default ListResults
