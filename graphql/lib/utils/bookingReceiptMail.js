import {toGlobalId} from 'graphql-relay'
import moment from 'moment-timezone'
import sendgrid from 'sendgrid'
import config from '~/config'
import {pg} from '~/db'
import {updateUserContactInfo, roomTypes} from '~/lib/utils'

function bookingTimeText(booking) {
  const start = moment(booking.start, 'x').tz('Europe/Oslo')
  const end = moment(booking.end, 'x').tz('Europe/Oslo')

  return `${start.format('DD.MM.YYYY')}, kl. ${start.format('HH:00')}-${end.format('HH:00')}`
}

function generateMailText(booking, room, owner, events) {
  const downloadText = `
    Last ned \
    <a href="${config.adminUrl.split('admin')[0]}api/ics/${toGlobalId('Booking', booking.id)}">kalenderfil</a> \
    for bookingen.
  `

  const footerText = `
    <hr style="width: 160px;margin-left: 0px;"/><br />\
    Hilsen Drammen booking<br /><br />
    <a href="${config.publicUrl}#/vilkar"><b>Vilkår</b></a>
  `

  let mailText = `
    <h4>Bookingbekreftelse</h4><br />
    Du har booket ${roomTypes[room.type]} ${room.name} på ${owner.name}`

  if (events.length === 1) {
    mailText += ` ${bookingTimeText(events[0])}.<br /><br />`
  } else {
    mailText += `<br />${events.map(ev => bookingTimeText(ev)).reduce((a, b) => a.concat(`<br />${b}`))}<br /><br />`
  }

  mailText += `
    Husk å avtale tid med skolen for henting av nøkler.<br /><br />

    Skolens kontaktperson: ${owner.contactName}, tlf. ${owner.contactPhone}<br /><br />
    ${downloadText}<br /><br />
    ${footerText}
  `

  return mailText
}

export default async function bookingReceiptMail(booking, user, events) {
  const updatedUser = await updateUserContactInfo(user)
  const mailer = sendgrid(config.sendgridKey)

  const room = await pg.connection.first('*').from('rooms').where({id: booking.roomId})
  const owner = await pg.connection.first('*').from('owners').where({id: room.ownerId})

  const mailText = generateMailText(booking, room, owner, events)

  const helper = sendgrid.mail
  const fromEmail = new helper.Email('ikkesvar@drmk.no', 'Drammen booking')
  const toEmail = new helper.Email(config.emailRedirect || updatedUser.email)
  const subject = `Drammen booking - Bookingbekreftelse på ${owner.name}`
  const content = new helper.Content('text/html', mailText)
  const mail = new helper.Mail(fromEmail, subject, toEmail, content)

  return mailer.API(mailer.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  }))
  .catch(error => {
    console.log('Sendgrid error')
    console.log(error)
    console.log(error.response.body)
  })
}
