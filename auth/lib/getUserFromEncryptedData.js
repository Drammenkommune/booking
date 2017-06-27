import xpath from 'xpath'
import {DOMParser} from 'xmldom'
import {decrypt} from 'xml-encryption'
import {pg} from '~/db'
import config from '~/config'

export function decryptAndGetInfo(encrypted) {
  return new Promise((resolve) => {
    decrypt(encrypted, {key: config.certPrivate}, (err, result) => {
      console.log(result)
      const doc = new DOMParser().parseFromString(result)
      const sessionIndex = xpath.select('//*[local-name(.)=\'AuthnStatement\']/@SessionIndex', doc)[0].value
      const nameId = xpath.select('//*[local-name(.)=\'NameID\']', doc)[0].childNodes[0].data

      const statementNode = xpath.select('//*[local-name(.)=\'AttributeStatement\']', doc)[0]
      const uidNode = xpath.select('//*[local-name(.)=\'Attribute\'][@Name=\'uid\']', statementNode)[0]
      const phoneNode = xpath.select('//*[local-name(.)=\'Attribute\'][@Name=\'mobiltelefonnummer\']', statementNode)[0]
      const emailNode = xpath.select('//*[local-name(.)=\'Attribute\'][@Name=\'epostadresse\']', statementNode)[0]

      resolve({
        ssn: uidNode.childNodes[0].childNodes[0].data,
        email: emailNode ? emailNode.childNodes[0].childNodes[0].data : null,
        phone: phoneNode ? phoneNode.childNodes[0].childNodes[0].data : null,
        sessionIndex, nameId
      })
    })
  })
}

async function getUserIfExisting(user) {
  const existing = await pg.connection.first('*').from('users').where({ssn: user.ssn})
  return existing
    ? pg.connection
      .update(user)
      .from('users')
      .where({ssn: user.ssn})
      .returning('*')
      .then(res => res[0])
    : pg.connection
      .insert(user)
      .into('users')
      .returning('*')
      .then(res => res[0])
}

export default function(encrypted) {
  return decryptAndGetInfo(encrypted)
    .then(getUserIfExisting)
}
