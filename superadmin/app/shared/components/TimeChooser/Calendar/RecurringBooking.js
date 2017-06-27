import React from 'react'
import {Checkbox} from 'material-ui'

import {Content, CenterContent} from '@/components'

const AVAILABLE = 'available'

const RecurringBooking = ({onHandleRecurringCheck, recurringBookings, multipleDays, recurring}) => {
  let text = 'Gjenta ukentlig'
  if (recurringBookings && recurringBookings.length) {
    const available = recurringBookings.filter(({status}) => status === AVAILABLE)
    text = `Gjenta ukentlig (${available.length} av ${recurringBookings.length} uker ledig)`
  }
  return (
    <Content>
      <CenterContent>
        {!multipleDays && (
          <Checkbox
            label={text}
            aria-label={text}
            checked={recurring}
            style={{width: 'initial'}}
            labelStyle={{width: 'initial'}}
            onCheck={onHandleRecurringCheck}/>
        )}
      </CenterContent>
    </Content>
  )
}

RecurringBooking.propTypes = {
  onHandleRecurringCheck: React.PropTypes.func.isRequired,
  recurringBookings: React.PropTypes.array,
  multipleDays: React.PropTypes.bool,
  recurring: React.PropTypes.bool
}

export default RecurringBooking
