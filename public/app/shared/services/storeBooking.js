import moment from 'moment'
const DATE_FORMAT = 'DD.MM.YYYY'
const DAY_AND_HOUR_FORMAT = 'DD.MM.YYYY HH:mm'

export function removeBookingDatesAndTime() {
  const dates = (sessionStorage.getItem('dk_booking_dates') || '').split(',')
  dates.forEach(date => {
    sessionStorage.removeItem(`dk_booking_start_${date}`)
    sessionStorage.removeItem(`dk_booking_end_${date}`)
    sessionStorage.removeItem(`dk_booking_status_${date}`)
  })
  sessionStorage.removeItem('dk_booking_dates')
  sessionStorage.removeItem('dk_booking_recurring')
}

function cloneTimeStamp(date, timestamp) {
  return date.clone()
    .millisecond(timestamp.millisecond())
    .second(timestamp.second())
    .minute(timestamp.minute())
    .hour(timestamp.hour())
}

export function setBookingDatesAndTime(days, recurring) {
  removeBookingDatesAndTime()
  const dates = []

  days.forEach(day => {
    const date = day.day.clone().format(DATE_FORMAT)
    const start = cloneTimeStamp(day.day, day.start)
    const end = cloneTimeStamp(day.day, day.end)

    dates.push(date)
    sessionStorage.setItem(`dk_booking_start_${date}`, start.clone().format(DAY_AND_HOUR_FORMAT))
    sessionStorage.setItem(`dk_booking_end_${date}`, end.clone().format(DAY_AND_HOUR_FORMAT))
    if (recurring) { sessionStorage.setItem(`dk_booking_status_${date}`, day.status) }
  })
  if (recurring) { sessionStorage.setItem('dk_booking_recurring', true) }
  sessionStorage.setItem('dk_booking_dates', dates.join(','))
}

export function getBookingDatesAndTimes() {
  const dates = (sessionStorage.getItem('dk_booking_dates') || '').split(',')
  return dates.map(date => ({
    day: moment(date, DATE_FORMAT),
    start: moment(sessionStorage.getItem(`dk_booking_start_${date}`), DAY_AND_HOUR_FORMAT),
    end: moment(sessionStorage.getItem(`dk_booking_end_${date}`), DAY_AND_HOUR_FORMAT),
    status: sessionStorage.getItem(`dk_booking_status_${date}`)
  }))
}

export function getBookingRecurring() {
  return sessionStorage.getItem('dk_booking_recurring') === 'true'
}
