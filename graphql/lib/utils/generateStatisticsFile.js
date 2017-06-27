import moment from 'moment-timezone'
import xlsx from 'xlsx'
import {getBookings} from '~/lib/utils'
import {pg} from '~/db'

function generateFile(stats) {
  const startDate = moment(stats.start, 'x').tz('Europe/Oslo').format('DD.MM.YYYY')
  const endDate = moment(stats.end, 'x').tz('Europe/Oslo').format('DD.MM.YYYY')

  const wbData = [['Navn', 'Antall bookinger']]
  const owners = stats.owners
  owners.forEach(owner => wbData.push([owner.name, owner.bookings.length]))


  const durations = {}
  const {bookings} = stats
  wbData.push(['Totalt', bookings.length])
  bookings.forEach(event => {
    const start = moment(event.start, 'x')
    const end = moment(event.end, 'x')
    const diff = end.diff(start, 'hours') || 1
    durations[diff] = durations[diff] ? durations[diff] + 1 : 1
  })

  if (Object.keys(durations).length > 0) {
    wbData.push(['', ''])
    wbData.push(['Varighet', 'Antall bookinger'])
  }

  Object.keys(durations).map(key => wbData.push([
    parseInt(key, 10) > 1 ? `${key} timer` : `${key} time`,
    durations[key]
  ]))


  const wb = {
    SheetNames: ['Statistikk'],
    Sheets: {
      Statistikk: xlsx.utils.aoa_to_sheet(wbData),
    }
  }

  const data = xlsx.write(wb, {type: 'base64', bookType: 'xlsx'})
  return {
    name: `Statistikk-(${startDate}-${endDate}).xlsx`,
    data
  }
}

function ownerStats(owner, stats) {
  const {start, end} = stats
  return getBookings(null, start, end, null, owner.id)
    .then(bookings => {
      return Promise.all(bookings.map(({id}) => {
        return pg.connection
          .select('*')
          .from('booking_events')
          .where({bookingId: id})
      }))
    })
    .then(events => {
      return ({...owner, bookings: events.length ? events.reduce((prev, curr) => prev.concat(curr)) : []})
    })
}

function owners(stats) {
  return pg.connection
    .select('*')
    .from('owners')
    .then(owners => {
      return Promise.all(owners.map(owner => ownerStats(owner, stats)))
    })
    .then(owners => {
      const bookings = owners.map(({bookings}) => bookings).reduce((prev, curr) => prev.concat(curr))
      return ({...stats, owners, bookings})
    })
}

export default function generateStatisticsFile(start, end) {
  return owners({start, end})
    .then(generateFile)
}
