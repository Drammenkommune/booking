import React from 'react'
import moment from 'moment'
import {saveAs} from 'file-saver'
import {DatePicker} from 'material-ui'
import {css, StyleSheet} from 'aphrodite'

import {PaddedButton, ValidationInput} from '@/components'
import {theme} from '@/services'
import {formatDate, DateTimeFormat} from '~/services'

if (!window.fetch) {
  window.fetch = require('whatwg-fetch')
}

const datePickerStyle = {
  opacity: 0, height: '100%',
  position: 'absolute',
  top: 0, left: 0,
  right: 0, bottom: 0,
}
const styles = StyleSheet.create({
  form: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  input: {
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
  button: {
    marginLeft: 'auto',
    marginTop: 20,
    marginBottom: 0
  }
})

const dateFormat = 'DD.MM.YYYY'
const statisticsUrl = '/api/stats'

class DateSelection extends React.Component {
  constructor(props) {
    super(props)
    const {semesterStart, semesterEnd} = props
    this.state = {
      startDate: semesterStart
        ? moment(new Date(semesterStart)).toDate()
        : moment().dayOfYear(1).toDate(),
      endDate: semesterEnd
        ? moment(new Date(semesterEnd)).toDate()
        : moment().toDate(),
      editMode: false
    }
    this.updateStartDate = ::this.updateStartDate
    this.updateEndDate = ::this.updateEndDate
    this.onHandleSubmit = ::this.onHandleSubmit
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

  onHandleSubmit({startDate, endDate}) {
    const start = moment(startDate, dateFormat)
    const end = moment(endDate, dateFormat)
    const token = localStorage.getItem('dk_superadmin_token')
    const url = `${statisticsUrl}?start=${start.format('x')}&end=${end.format('x')}&token=${token}`

    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const fileName = `Statistikk-(${start.format(dateFormat)}-${end.format(dateFormat)}).xlsx`

        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName)
        } else {
          saveAs(blob, fileName)
        }
      })
  }

  render() {
    const startValue = this.state.startDate
      ? formatDate(this.state.startDate, dateFormat)
      : ''

    const endvalue = this.state.endDate
      ? formatDate(this.state.endDate, dateFormat)
      : ''

    return (
      <Formsy.Form
        className={css(styles.form)}
        onValidSubmit={this.onHandleSubmit}>
        <label className={css(styles.label)}>
          <h3>Fra dato:</h3>
          <ValidationInput
            name="startDate"
            readOnly={true}
            required
            placeholder="Startdato"
            className={css(styles.input)}
            value={startValue}/>
          <DatePicker
            autoOk={true}
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
            name="endDate"
            readOnly={true}
            required
            placeholder="Sluttdato"
            className={css(styles.input)}
            value={endvalue || startValue}/>
          <DatePicker
            autoOk={true}
            onChange={this.updateEndDate}
            textFieldStyle={datePickerStyle}
            DateTimeFormat={DateTimeFormat}
            minDate={this.state.startDate}
            locale="nb"
            hintText="Dato"
            value={this.state.endDate}
            formatDate={(date) => formatDate(date, dateFormat)}/>
        </label>
        <PaddedButton
          className={css(styles.button)}
          backgroundColor={theme.submitColor}
          color="#FFF"
          type="submit"
          label="Hent"
        />
      </Formsy.Form>
    )
  }
}

DateSelection.propTypes = {
  semesterStart: React.PropTypes.string,
  semesterEnd: React.PropTypes.string
}

export default DateSelection
