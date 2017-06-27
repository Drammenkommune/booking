import fetch from 'node-fetch'
import config from '~/config'

export default (signedXml) => {
  return fetch(config.personInfoUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/soap+xml;charset=UTF-8'
    },
    body: signedXml
  }).then(res => res.text())
  .catch(error => {
    console.log('Error from KRR fetching')
    console.log(error)
  })
}
