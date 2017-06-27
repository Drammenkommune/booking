import {DOMParser} from 'xmldom'
import xpath from 'xpath'

export default function extractPersonInfo(xml) {
  const doc = new DOMParser().parseFromString(xml)

  const contact = {
    phone: xpath.select('//*[local-name(.)=\'Mobiltelefonnummer\']', doc)[0].childNodes[0].data,
    email: xpath.select('//*[local-name(.)=\'Epostadresse\']', doc)[0].childNodes[0].data,
  }

  return contact
}
