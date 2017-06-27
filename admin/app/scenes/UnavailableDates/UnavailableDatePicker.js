import React from 'react'
import moment from 'moment'
import Formsy from 'formsy-react'
import DateIcon from 'material-ui/svg-icons/action/date-range'
import {IconButton, DatePicker} from 'material-ui'

import {BoldText, Content, ValidationInput, PaddedButton} from '@/components'
import {formatDate, DateTimeFormat} from '~/services'
import {snackbar} from '~/services'
import {theme} from '@/services'

const datePickerStyle = {
  opacity: 0,
  position: 'absolute',
  top: 0, left: 0,
  right: 0, bottom: 0,
}
const dateFormat = 'DD.MM.YYYY'
const DATE_REGEX = '^(?:(?:31(.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)\\d{2})$'

class UnavailableDatePicker extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null
    }
    this.addDate = ::this.addDate
    this.updateStartDate = ::this.updateStartDate
    this.updateEndDate = ::this.updateEndDate
    this.openDatePicker = ::this.openDatePicker
  }

  addDate() {
    const {startDate, endDate} = this.state
    if (
      startDate && endDate
      && (moment(startDate).isAfter(moment(endDate)))
    ) {
      snackbar('Startdato kan ikke være etter sluttdato')
      return
    }
    this.props.onAddDate(
      formatDate(startDate, dateFormat),
      endDate ? formatDate(endDate, dateFormat) : null
    )
    this.setState({startDate: null, endDate: null})
  }

  updateStartDate(event, value) {
    let startDate = null

    if (event) {
      startDate = event.target.value && event.target.value.match(/[0-9]{2}.[0-9]{2}.[0-9]{4}/)
        ? moment(event.target.value, dateFormat).toDate()
        : ''

      if (startDate.toString() === 'Invalid Date') {
        startDate = ''
        snackbar('Ugyldig dato format')
      }
    } else {
      startDate = value
    }

    if (this.state.endDate) {
      const start = moment(startDate)
      const end = moment(this.state.endDate)
      if (start.isSameOrAfter(end)) {
        this.setState({endDate: null})
      }
    }
    this.setState({startDate})
  }

  updateEndDate(event, value) {
    let endDate = null

    if (event) {
      endDate = event.target.value && event.target.value.match(/[0-9]{2}.[0-9]{2}.[0-9]{4}/)
        ? moment(event.target.value, dateFormat).toDate()
        : ''
      if (endDate.toString() === 'Invalid Date') {
        endDate = ''
        snackbar('Ugyldig dato format')
      }
    } else {
      endDate = value
    }
    this.setState({endDate})
  }

  openDatePicker(ev, dialogRef) {
    ev.stopPropagation()
    ev.preventDefault()
    this.refs[dialogRef].openDialog()
  }

  render() {
    const startValue = this.state.startDate
      ? formatDate(this.state.startDate, dateFormat)
      : ''

    const endvalue = this.state.endDate
      ? formatDate(this.state.endDate, dateFormat)
      : ''

    return (
      <Content>
        <Formsy.Form
          style={{display: 'flex', flexWrap: 'wrap'}}
          onValidSubmit={this.addDate}>
          <label style={{width: '100%'}}>
            <BoldText>Startdato (format: DD.MM.ÅÅÅÅ)*</BoldText>
            <div style={{width: '100%', display: 'flex'}}>
              <ValidationInput
                placeholder="Eksempel: 30.12.2017"
                pattern={DATE_REGEX}
                style={{flex: 1}}
                name="startDate"
                type="text"
                onChange={this.updateStartDate}
                value={startValue}
                required
              />
              <IconButton
                style={{paddingBottom: 0}}
                onTouchTap={(event) => this.openDatePicker(event, 'startDatePicker')}>
                <DateIcon />
              </IconButton>
              <DatePicker
                ref="startDatePicker"
                tabIndex="-1"
                autoOk={true}
                onChange={this.updateStartDate}
                textFieldStyle={datePickerStyle}
                DateTimeFormat={DateTimeFormat}
                locale="nb"
                hintText="Dato"
                value={this.state.startDate || null}
                formatDate={(date) => formatDate(date, dateFormat)}/>
            </div>
          </label>
          <label style={{width: '100%', marginTop: 10}}>
            <BoldText>Sluttdato (format: DD.MM.ÅÅÅÅ)</BoldText>
            <div style={{width: '100%', display: 'flex'}}>
              <ValidationInput
                placeholder="Eksempel: 31.12.2017"
                pattern={DATE_REGEX}
                style={{flex: 1}}
                name="endDate"
                type="text"
                value={endvalue}
                onChange={this.updateEndDate}
              />
              <IconButton
                style={{paddingBottom: 0}}
                onTouchTap={(event) => this.openDatePicker(event, 'endDatePicker')}>
                <DateIcon />
              </IconButton>
              <DatePicker
                ref="endDatePicker"
                tabIndex="-1"
                autoOk={true}
                onChange={this.updateEndDate}
                textFieldStyle={datePickerStyle}
                DateTimeFormat={DateTimeFormat}
                locale="nb"
                hintText="Dato"
                value={this.state.endDate || null}
                formatDate={(date) => formatDate(date, dateFormat)}/>
            </div>
          </label>
          <PaddedButton
            type="submit"
            color="#FFF"
            backgroundColor={theme.submitColor} label="Legg til"
            style={{marginTop: 16, marginLeft: 'auto', marginRight: 'auto'}}
          />
        </Formsy.Form>
      </Content>
    )
  }
}

UnavailableDatePicker.propTypes = {
  onAddDate: React.PropTypes.func.isRequired
}

export default UnavailableDatePicker
