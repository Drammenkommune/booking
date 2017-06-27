import React from 'react'
import moment from 'moment'

import roomTypes from './roomTypes'

export const formatNewLines = (fullText) => {
  return fullText
    ? fullText.split('\n').map((text, index) => (
      <span key={`formatted${index}`}>{text} <br /></span>
    ))
    : null
}

export const formatNewLinesAsPoints = (fullText) => {
  return fullText
    ? (
      <ul>
        {fullText.split('\n\n').map((text, index) => (
          <li key={`formatted${index}`}>
            {formatNewLines(text)}
          </li>
        ))}
      </ul>
    )
    : null
}

export const formatBookingTime = (start, end) => {
  const timeStart = moment(new Date(parseInt(start, 10)))
  const timeEnd = moment(new Date(parseInt(end, 10)))
  const date = timeStart.format('DD.MM.YYYY')
  return `${date}, kl.${timeStart.format('HH:mm')}-${timeEnd.format('HH:mm')}`
}

export const formatDetailedRecurringText = (events) => {
  const eventsLeft = events.filter(({end}) =>
    parseInt(end, 10) > new Date().getTime()
  )

  const upcoming = eventsLeft && eventsLeft[0]
  const upcomingText = upcoming
    ? `Første booking er uke \
      ${moment(upcoming.start, 'x').week()},\
      ${formatBookingTime(upcoming.start, upcoming.end)}
    `
    : null

  return `${eventsLeft.length} av ${events.length} bookinger gjenstår.\
   ${upcomingText}
  `
}

export const formatShortRecurringText = (events) => {
  const {start, end} = events[0]
  const startTime = moment(start, 'x')
  const endTime = moment(end, 'x')
  const days = `${startTime.format('dddd')}er` // Pluralization of day-names

  return `${days}, kl.${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}`
}

export const formatPhoneNumber = (number) => {
  const numberString = number.toString()
  return `${numberString.slice(0, 3)} ${numberString.slice(3, 5)} ${numberString.slice(5, 8)}`
}

const DATE_FORMAT = 'DD.MM.YYYY'
const HOUR_FORMAT = 'HH:mm'

export function formatRecurringReceiptText(events) {
  const firstDate = events[0].start.format(DATE_FORMAT)
  const lastDate = events[events.length - 1].start.format(DATE_FORMAT)
  const startTime = events[0].start.format(HOUR_FORMAT)
  const endTime = events[0].end.format(HOUR_FORMAT)
  const days = `${events[0].start.format('dddd')}er`

  return `på ${events.length} ${days} kl.${startTime}-${endTime} i perioden ${firstDate} - ${lastDate}`
}

export function firstBookingText(booking) {
  return `${booking.start.format(DATE_FORMAT)} \
  ${booking.start.format(HOUR_FORMAT)} - ${booking.end.format(HOUR_FORMAT)}`
}

export function constructSubtitle(events, room, recurring) {
  if (events.length === 1) {
    return `Du har nå booket ${roomTypes[room.type]} \
    ${room.name} på ${room.ownerName} \
    ${formatBookingTime(events[0].start.format('x'), events[0].end.format('x'))} \n
    Husk å avtale tid med skolen for henting av nøkler`
  } else if (events.length > 1 && recurring) {
    return `Du har nå booket ${roomTypes[room.type]} \
    ${room.name} på ${room.ownerName} \
    ${formatRecurringReceiptText(events.filter(ev => ev.status === 'available'))}
    Husk å avtale tid med skolen for henting av nøkler`
  } else if (events.length > 1 && !recurring) {
    return `Du har nå gjort ${events.length} bookinger på ${roomTypes[room.type]} \
    ${room.name} på ${room.ownerName}.\n\n \
    ${events.map(ev => firstBookingText(ev)).reduce((a, b) => a.concat(`\n${b}`))}\n
    Husk å avtale tid med skolen for henting av nøkler`
  }
}
