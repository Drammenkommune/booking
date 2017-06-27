import React from 'react'
import moment from 'moment'
import {css, StyleSheet} from 'aphrodite'
import {IconButton} from 'material-ui'
import CloseIcon from 'material-ui/svg-icons/content/clear'

import {
  ActionLink, BoldText, Card, CenterContent,
  Content, GridContainer, Overlay
} from '@/components'
import {theme} from '@/services'
import {formatAvailability} from '@/services'

const smallIconButton = {height: 24, width: 24, marginLeft: 12, padding: 0}
const styles = StyleSheet.create({
  overlayWrap: {
    width: 500,
    maxHeight: '100%',
    overflowY: 'scroll'
  },
  card: {
    marginBottom: 0,
    '@media (max-width: 480px)': {
      borderRadius: 0,
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0
    }
  }
})

const formatWeek = (weekNumber, week, start, end) => {
  return (
    <p key={weekNumber} style={{textTransform: 'capitalize'}}>
      <BoldText fontSize={13}>Uke {weekNumber}: </BoldText>
      {formatAvailability(week, start.clone().week(weekNumber), end)}
    </p>
  )
}

const renderEvents = (events, recurring, onCancelEventClick) => {
  return events.map((ev, index) => {
    const start = moment(ev.start, 'x')
    const end = moment(ev.end, 'x')
    return (
      <div key={index} style={{display: 'flex', alignItems: 'center'}}>
        {formatWeek(start.week(), recurring ? ev.status : 'available', start, end)}
        {onCancelEventClick && (
          <IconButton
            aria-label="Kanseller booking event"
            onTouchTap={(e) => onCancelEventClick(e, ev.id)}
            style={smallIconButton}>
            <CloseIcon color={theme.errorColor}/>
          </IconButton>
        )}
      </div>
    )
  })
}

const Recurring = ({events, recurring, onHandleClose, onCancelEventClick}) => {
  const bookingCount = recurring
    ? events.filter(({status}) => status === 'available').length
    : events.length

  const cardAction = (
    <IconButton aria-label="Lukk booking event oversikt" onTouchTap={onHandleClose}>
      <CloseIcon />
    </IconButton>
  )

  return (
    <Overlay onHandleClick={onHandleClose}>
      <div className={css(styles.overlayWrap)}>
        <GridContainer>
          <div>
            <Card
              className={css(styles.card)}
              dividerColor={theme.bookingColor}
              title={recurring
                ? `Tidspunkter (${bookingCount} av ${events.length} uker)`
                : `Tidspunkter (${bookingCount} bookinger)`
              }
              action={cardAction}>
              <Content style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <div style={{flex: 1, overflowY: 'scroll', maxHeight: 550}}>
                  {renderEvents(events, recurring, onCancelEventClick)}
                </div>
                <CenterContent>
                  <ActionLink onTouchTap={onHandleClose}>
                  Lukk vindu
                  </ActionLink>
                </CenterContent>
              </Content>
            </Card>
          </div>
        </GridContainer>
      </div>
    </Overlay>
  )
}

Recurring.propTypes = {
  start: React.PropTypes.object,
  end: React.PropTypes.object,
  recurring: React.PropTypes.bool,
  events: React.PropTypes.array,
  onHandleClose: React.PropTypes.func.isRequired,
  onCancelEventClick: React.PropTypes.func
}

export default Recurring
