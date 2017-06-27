import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import {FlatButton} from 'material-ui'
import DownloadIcon from 'material-ui/svg-icons/action/date-range'

import {ActionConfirm} from '@/components'
import {formatNewLines, receipt, theme} from '@/services'

const messages = {
  newRoom: {
    title: 'Lokale registrert',
    subtitle: 'Lokalet er nå registrert og åpent for booking av innloggede brukere.',
    dividerColor: theme.roomColor
  },
  adminCancelledBooking: {
    title: 'Bookingen er kansellert',
    subtitle: 'Bookingen er nå fjernet og lånetager er informert',
    dividerColor: theme.errorColor
  },
  userCancelledBooking: {
    title: 'Din booking er kansellert',
    subtitle: 'Din booking er nå fjernet.',
    dividerColor: theme.errorColor
  }
}

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

const Receipt = ({redirect}, {router}) => {
  const type = receipt.getType()
  let message = {}
  if (!type) {
    router.replace(redirect)
    return null
  } else if (type === 'newBoooking') {
    const config = receipt.getConfig()
    const {bookingId, ...rest} = config
    message = rest
    message.action = (
      <FlatButton
        aria-label="Last ned kalenderfil"
        style={{minWidth: 0, padding: '0 10px'}}
        href={`/api/ics/${bookingId}`}>
        <span className={css(styles.downloadText)}>Last ned</span>
        <DownloadIcon style={{marginTop: 5}} />
      </FlatButton>
    )
    message.subtitle = formatNewLines(message.subtitle)
  } else {
    message = messages[type]
  }

  const onHandleRedirect = () => {
    receipt.removeType()
    router.replace(redirect)
  }

  return (
    <ActionConfirm {...message} redirect={onHandleRedirect}/>
  )
}

Receipt.propTypes = {
  redirect: React.PropTypes.string.isRequired
}

Receipt.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Receipt
