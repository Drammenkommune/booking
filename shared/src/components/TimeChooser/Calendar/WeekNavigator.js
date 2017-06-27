import React from 'react'
import moment from 'moment'
import {IconButton, SelectField, MenuItem} from 'material-ui'
import LeftArrow from 'material-ui/svg-icons/navigation/chevron-left'
import RightArrow from 'material-ui/svg-icons/navigation/chevron-right'

import BoldText from '@/components/BoldText'

const styles = {
  arrow: {
    padding: 0,
    height: 24,
    width: 24,
    opacity: 0.54
  },
  select: {
    borderRadius: 3,
    border: '1px solid #2C3F4E',
    fontSize: 16,
    height: 30
  },
  menu: {
    height: 30
  },
  selected: {
    position: 'relative',
    top: 2,
    left: 8
  }
}

class WeekNavigator extends React.Component {

  constructor(props) {
    super(props)
    this.onHandleWeekChange = ::this.onHandleWeekChange
  }

  componentWillMount() {
    const {semester, currentWeek} = this.props
    this.weeks = []
    const weeksInYear = moment().weeksInYear()
    const weekCount = semester
      ? Math.round(
        moment(new Date(semester.end)).diff(moment(new Date(semester.start)), 'weeks', true)
      )
      : weeksInYear

    const firstWeek = moment(new Date(semester.start))

    for (let i = 0; i <= weekCount; i++) {
      const week = firstWeek.clone().add(i, 'weeks')
      this.weeks.push({
        week: week.week(),
        weekOffset: Math.round(week.diff(currentWeek, 'weeks', true)),
        firstDay: week.clone().startOf('week').format('DD'),
        lastDay: week.clone().endOf('week').format('DD.MM')
      })
    }
  }

  formatWeekText(currentWeek) {
    const week = currentWeek.clone()
    const weekNumber = week.week()
    const firstDay = week.format('DD')
    const lastDay = week.format('DD.MM')
    return (
      <BoldText>Uke: {weekNumber} ({firstDay} - {lastDay})</BoldText>
    )
  }

  chosenWeekInList(currentWeek, weekOffset) {
    return this.weeks.findIndex(week => week.weekOffset === weekOffset) >= 0
  }

  onHandleWeekChange(ev, key, weekOffset) {
    const newOffset = weekOffset - this.props.currentWeekOffset
    this.props.onHandleWeekChange(newOffset)
  }

  render() {
    const {onHandleWeekChange, currentWeek, currentWeekOffset} = this.props
    const hideLabel = this.chosenWeekInList(currentWeek, currentWeekOffset)
    return (
      <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <IconButton
          aria-label="Forrige uke"
          style={{...styles.arrow, marginRight: 20}}
          onTouchTap={() => onHandleWeekChange(-1)}>
          <LeftArrow />
        </IconButton>
        <SelectField
          value={hideLabel ? currentWeekOffset : null}
          style={styles.select}
          menuStyle={styles.menu}
          onChange={this.onHandleWeekChange}
          maxHeight={200}
          hintText={this.formatWeekText(this.props.currentWeek)}
          hintStyle={{bottom: 2, left: 8, opacity: hideLabel ? 0 : 1}}
          iconStyle={{top: 3, fill: 'rgba(0, 0, 0)'}}
          labelStyle={{lineHeight: '32px'}}
          underlineStyle={{display: 'none'}}>
          {this.weeks.map(({week, weekOffset, firstDay, lastDay}, index) => (
            <MenuItem
              key={index}
              value={weekOffset}
              style={{top: -8}}
              label={(<BoldText style={styles.selected}>Uke: {week} ({firstDay} - {lastDay})</BoldText>)}
              primaryText={(<BoldText>Uke: {week} ({firstDay} - {lastDay})</BoldText>)}/>
          ))}
        </SelectField>
        <IconButton
          aria-label="Neste uke"
          style={{...styles.arrow, marginLeft: 20}}
          onTouchTap={() => onHandleWeekChange(1)}>
          <RightArrow />
        </IconButton>
      </div>
    )
  }
}

WeekNavigator.propTypes = {
  onHandleWeekChange: React.PropTypes.func.isRequired,
  currentWeek: React.PropTypes.object.isRequired,
  semester: React.PropTypes.object.isRequired,
  currentWeekOffset: React.PropTypes.number
}

export default WeekNavigator
