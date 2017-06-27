import React from 'react'
import {IconButton} from 'material-ui'
import CloseIcon from 'material-ui/svg-icons/content/clear'

import {BoldText} from '@/components'
import {theme} from '@/services'

const smallIconButton = {height: 24, width: 24, marginLeft: 12, padding: 0}

const formatWeek = (weekNumber, day, start, end, status) => {
  let recurringText = null
  if (status === 'busy') {
    recurringText = 'OPPTATT'
  } else if (status === 'closed') {
    recurringText = 'SKOLEN STENGT'
  }
  return (
    <p style={{textTransform: 'capitalize'}}>
      <BoldText fontSize={13}>Uke {weekNumber}: </BoldText>
      {recurringText
        ? <span>{recurringText}</span>
        : <span>{day.format('DD.MM.YYYY')} {start.format('HH:mm')} - {end.format('HH:mm')}</span>
      }
    </p>
  )
}

const Day = ({eventDay, onCancelEventClick, recurring}) => {
  const {day, start, end, status} = eventDay

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
    }}>
      {formatWeek(day.week(), day, start, end, status)}
      {!recurring || (recurring && status === 'available')
        ? (
          <IconButton
            aria-label="Fjern booking"
            onTouchTap={() => onCancelEventClick(day)}
            style={smallIconButton}>
            <CloseIcon color={theme.errorColor}/>
          </IconButton>
        )
        : null
      }
    </div>
  )
}

Day.propTypes = {
  eventDay: React.PropTypes.object.isRequired,
  onCancelEventClick: React.PropTypes.func.isRequired,
  recurring: React.PropTypes.bool
}

export default Day
