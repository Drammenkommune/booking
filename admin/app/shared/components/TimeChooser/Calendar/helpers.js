import moment from 'moment'

const DATE_FORMAT = 'DD.MM.YYYY'

function unavailableDatesToList(unavailable) {
  if (unavailable.endDate) {
    const unavailableDates = [moment(unavailable.startDate, DATE_FORMAT)]
    const end = moment(unavailable.endDate, DATE_FORMAT)
    while (unavailableDates[unavailableDates.length - 1].isBefore(end)) {
      const date = moment(unavailable.startDate, DATE_FORMAT).add(unavailableDates.length, 'days')
      unavailableDates.push(date)
    }
    return unavailableDates
  } else {
    return [moment(unavailable.startDate, DATE_FORMAT)]
  }
}

export function isDayBooked(day, bookings) {
  const sameDayBookings = bookings.filter(({start}) => (
    moment(start, 'x').isSame(day, 'day')
  ))
  return !!sameDayBookings.length
}

export function isDayInSemester(day, semester) {
  const start = moment(new Date(semester.start))
  const end = moment(new Date(semester.end))
  return day.isAfter(start, 'days') && day.isBefore(end, 'days')
}

export function isDayUnavailable(day, unavailable, semester) {
  const unavailableDates = (unavailable || []).map(unavailableDatesToList)
  const matchingDays = unavailableDates.length > 0
    ? unavailableDates
      .reduce((a, b) => a.concat(b))
      .filter(date => date.isSame(day, 'day'))
    : []

  return !!matchingDays.length || moment().isAfter(day, 'days')
    || (semester && !isDayInSemester(day, semester))
}

export function momentTime(day, hour) {
  return day.clone().hour(hour.split(':')[0]).minutes(0).seconds(0).milliseconds(0)
}

export function isHourBooked(day, hour, bookings, hourAndDay) {
  const time = day && hour ? momentTime(day, hour) : hourAndDay

  const sameHourBookings = bookings.filter(({start, end}) => (
    moment(start, 'x').isSameOrBefore(time, 'hour')
      && (
        moment(end, 'x').isAfter(time, 'hour')
        || (
          (time.diff(moment(end, 'x'), 'hours', true) >= -1
         && time.diff(moment(end, 'x'), 'hours', true) < 0)
        )
      )
  ))
  return !!sameHourBookings.length
}

export function isHourClosed(day, hour, openingTimes) {
  const {start, end} = openingTimes[day.weekday()]
  const time = momentTime(day, hour)

  return time.isBefore(momentTime(day, start), 'hour')
    || time.isAfter(momentTime(day, end), 'hour')
}

export function openingHours(day, openingTimes) {
  const {start, end} = openingTimes[day.weekday()]
  const lastHour = momentTime(day, end)
  const hours = [momentTime(day, start)]
  while (hours[hours.length - 1].isBefore(lastHour)) {
    const hour = momentTime(day, start).add(hours.length, 'hour')
    hours.push(hour)
  }
  return hours
}

export function startAndEndSelection(selectedTimes) {
  if (!selectedTimes || selectedTimes.length === 0) {
    return {start: null, end: null}
  } else if (selectedTimes.length === 1) {
    const end = selectedTimes[0].clone().add(1, 'hours')
    return {
      start: selectedTimes[0].clone(),
      end: end.hour() === 0 ? end.subtract(1, 'milliseconds') : end
    }
  } else {
    const sortedSelected = selectedTimes.sort((a, b) => {
      return parseInt(a.format('x'), 10) - parseInt(b.format('x'), 10)
    })
    const end = sortedSelected[sortedSelected.length - 1].clone().add(1, 'hours')
    return {
      start: sortedSelected[0].clone(),
      end: end.hour() === 0 ? end.subtract(1, 'milliseconds') : end
    }
  }
}

export function getSelectedDays(selectedTimes) {
  if (!selectedTimes || selectedTimes.length === 0) {
    return []
  } else {
    const daysArray = selectedTimes.map(time => time.clone().format(DATE_FORMAT))
    const uniqueDays = [...new Set(daysArray)]
    return uniqueDays
      .map(day => moment(day, DATE_FORMAT))
      .sort((a, b) => {
        return parseInt(a.format('x'), 10) - parseInt(b.format('x'), 10)
      })
  }
}

export function getRecurringDays(selectedTimes, recurringBookings) {
  if (!selectedTimes || selectedTimes.length === 0) {
    return []
  } else if (!recurringBookings || recurringBookings.filter(({status}) => status === 'available').length === 0) {
    return []
  } else {
    const first = startAndEndSelection(selectedTimes).start

    return (recurringBookings || [])
      .map((recurring, index) => {
        return first.clone().add(index, 'weeks')
      })
  }
}

export function getStartAndEndPerDay(selectedDays, selectedTimes, recurring) {
  return (selectedDays || []).map(day => {
    const {start, end} = startAndEndSelection(recurring
      ? selectedTimes
      : selectedTimes.filter(time => time.isSame(day, 'day'))
    )
    return {day, start, end}
  })
}

export function isTimeSelected(day, hour, selectedTimes) {
  if (!selectedTimes.length) { return false }
  const time = momentTime(day, hour)
  const sameDaySelections = selectedTimes.filter(selected => selected.isSame(time, 'day'))

  const {start, end} = startAndEndSelection(sameDaySelections)

  return time.isSameOrAfter(start, 'hour')
    && (
      time.isBefore(end)
      || (time.diff(end, 'hours', true) >= -1
      && time.diff(end, 'hours', true) < 0)
    )
}

export function getHoursInBetween(start, end) {
  const hours = []
  const startIsAfter = start.diff(end, 'hours') > 0
  const numberOfHours = startIsAfter
    ? start.diff(end, 'hours')
    : end.diff(start, 'hours')

  for (let i = 1; i < numberOfHours; i++) {
    hours.push(start.clone().add(startIsAfter ? i * -1 : i, 'hours'))
  }

  return hours
}
