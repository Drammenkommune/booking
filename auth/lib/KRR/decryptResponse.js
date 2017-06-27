import {DOMParser} from 'xmldom'
import xmlenc from '../xmlenc'
import config from '~/config'

export default function decryptResponse(xml) {
  const doc = new DOMParser().parseFromString(xml)

  return new Promise((resolve, reject) => {
    xmlenc.decrypt(doc, {key: config.certPrivate}, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  }).catch(error => {
    console.log('Error in decrypting KRR response')
    console.log(error)
  })
}
