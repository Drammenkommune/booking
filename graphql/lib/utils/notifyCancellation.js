import moment from 'moment'
import sendgrid from 'sendgrid'
import config from '~/config'
import updateUserContactInfo from './updateUserContactInfo'

function generateMailText(message, owner, room, booking, time) {
  return `
${owner.name} har kansellert din booking:

${time}

${room.name} - ${booking.organization}

Melding:

${message}`
}


export default async function(message, user, owner, room, booking, event) {
  const updatedUser = await updateUserContactInfo(user)
  const mailer = sendgrid(config.sendgridKey)
  const start = moment(event.start, 'x')
  const end = moment(event.end, 'x')
  const bookingTime = `${start.format('DD.MM.YYYY')}, kl. ${start.format('HH:mm')} - ${end.format('HH:mm')}`
  const mailText = generateMailText(message, owner, room, booking, bookingTime)

  const helper = sendgrid.mail
  const fromEmail = new helper.Email('ikkesvar@drmk.no', 'Drammen booking')
  const toEmail = new helper.Email(config.emailRedirect || updatedUser.email)
  const subject = 'Melding fra Drammen booking - Booking kansellert'
  const content = new helper.Content('text/plain', mailText)
  const mail = new helper.Mail(fromEmail, subject, toEmail, content)

  return mailer.API(mailer.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  })).catch(error => {
    console.log('Sendgrid error')
    console.log(error)
    console.log(error.response.body)
  })
}
