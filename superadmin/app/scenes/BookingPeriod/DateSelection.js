import React from 'react'
import moment from 'moment'
import Formsy from 'formsy-react'
import {DatePicker} from 'material-ui'
import {css, StyleSheet} from 'aphrodite'

import {PaddedButton, ValidationInput} from '@/components'
import {theme} from '@/services'
import {formatDate, DateTimeFormat} from '~/services'

const datePickerStyle = {
  opacity: 0, height: '100%',
  position: 'absolute',
  top: 0, left: 0,
  right: 0, bottom: 0,
}
const styles = StyleSheet.create({
  input: {
    width: '100%',
    pointerEvents: 'none',
    marginTop: 10
  },
  label: {
    width: '50%',
    marginTop: 10,
    position: 'relative',
    ':first-of-type': {
      paddingRight: 10
    },
    ':last-of-type': {
      paddingLeft: 10
    },
    '@media (max-width: 480px)': {
      width: '100%',
      ':first-of-type': {
        paddingRight: 0
      },
      ':last-of-type': {
        paddingLeft: 0
      }
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  }
})

const dateFormat = 'DD.MM.YYYY'

class DateSelection extends React.Component {

  state = {
    startDate: null,
    endDate: null
  }

  constructor(props) {
    super(props)
    this.state = {
      startDate: props.start
        ? new Date(props.start)
        : moment('01.01.1970', 'DD.MM.YYYY').toDate(),
      endDate: props.end
        ? new Date(props.end)
        : moment('02.01.1970', 'DD.MM.YYYY').toDate(),
    }
    this.onValidSubmit = ::this.onValidSubmit
    this.updateStartDate = ::this.updateStartDate
    this.updateEndDate = ::this.updateEndDate
  }

  updateStartDate(_, startDate) {
    if (this.state.endDate) {
      const start = moment(new Date(startDate))
      const end = moment(new Date(this.state.endDate))
      if (start.isSameOrAfter(end)) {
        this.setState({endDate: null})
      }
    }
    this.setState({startDate})
  }

  updateEndDate(_, endDate) {
    this.setState({endDate})
  }

  onValidSubmit({semesterStart, semesterEnd}) {
    if (semesterStart && semesterEnd) {
      this.props.onHandleSubmit({semesterStart, semesterEnd})
    }
  }

  render() {
    const {editMode} = this.props
    const startValue = this.state.startDate
      ? formatDate(this.state.startDate, dateFormat)
      : ''

    const endvalue = this.state.endDate
      ? formatDate(this.state.endDate, dateFormat)
      : ''

    return (
      <Formsy.Form className={css(styles.container)} onValidSubmit={this.onValidSubmit}>
        <label className={css(styles.label)}>
          <h3>Fra dato:</h3>
          <ValidationInput
            name="semesterStart"
            disabled={!editMode}
            placeholder="Startdato"
            value={startValue}/>
          <DatePicker
            autoOk={true}
            disabled={!editMode}
            onChange={this.updateStartDate}
            textFieldStyle={datePickerStyle}
            DateTimeFormat={DateTimeFormat}
            locale="nb"
            hintText="Dato"
            value={this.state.startDate}
            formatDate={(date) => formatDate(date, dateFormat)}/>
        </label>
        <label className={css(styles.label)}>
          <h3>Til dato:</h3>
          <ValidationInput
            name="semesterEnd"
            disabled={!editMode}
            placeholder="Sluttdato"
            value={endvalue || startValue}/>
          <DatePicker
            autoOk={true}
            disabled={!editMode}
            onChange={this.updateEndDate}
            textFieldStyle={datePickerStyle}
            DateTimeFormat={DateTimeFormat}
            minDate={this.state.startDate}
            locale="nb"
            hintText="Dato"
            value={this.state.endDate}
            formatDate={(date) => formatDate(date, dateFormat)}/>
        </label>
        {editMode && (
          <PaddedButton
            type="submit"
            style={{marginLeft: 'auto', marginTop: 16}}
            label="Lagre"
            backgroundColor={theme.submitColor}
            color="#FFF"
          />
        )}
      </Formsy.Form>
    )
  }
}

DateSelection.propTypes = {
  onHandleSubmit: React.PropTypes.func.isRequired,
  editMode: React.PropTypes.bool,
  start: React.PropTypes.string.isRequired,
  end: React.PropTypes.string.isRequired
}

export default DateSelection
