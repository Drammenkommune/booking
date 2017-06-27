import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import {FlatButton} from 'material-ui'
import DownloadIcon from 'material-ui/svg-icons/action/date-range'

import {Card, Content} from '@/components'


const styles = StyleSheet.create({
  downloadText: {
    fontSize: 18,
    verticalAlign: 'super',
    marginRight: 10,
    '@media (max-width: 550px)': {
      display: 'none'
    }
  }
})

const BookingInfo = ({booking, roomRedirect}, {theme}) => {
  const action = (
    <FlatButton
      aria-label="Last ned kalenderfil"
      style={{minWidth: 0, padding: '0 10px'}}
      href={`/api/ics/${booking.id}`}>
      <span className={css(styles.downloadText)}>Last ned</span>
      <DownloadIcon style={{marginTop: 5}} />
    </FlatButton>
  )

  return (
    <Card title="Booking info" color={theme.bookingColor} action={action}>
      <Content>
        <p style={{margin: 0}}>
          {booking.room.deleted
            ? (
              <span>{booking.room.name}</span>
            )
            : (
              <a href={`${roomRedirect}${booking.room.id}`}>
                {booking.room.name}
              </a>
            )
          }
        </p>
      </Content>
    </Card>
  )
}

BookingInfo.propTypes = {
  booking: React.PropTypes.object,
  roomRedirect: React.PropTypes.string
}

BookingInfo.contextTypes = {
  theme: React.PropTypes.object.isRequired,
}

export default BookingInfo
