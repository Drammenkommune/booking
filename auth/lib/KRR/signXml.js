import {SignedXml} from 'xml-crypto'
import FileKeyInfo from './FileKeyInfo'
import config from '~/config'

export default function signXml(envelope, keyId) {
  const signer = new SignedXml('wssecurity')
  signer.addReference(
    '//*[local-name(.)=\'Timestamp\']',
    ['http://www.w3.org/2001/10/xml-exc-c14n#'],
    ['http://www.w3.org/2001/04/xmlenc#sha256'],
    null, null,
    'wsse ns soap'
  )
  signer.addReference(
    '//*[local-name(.)=\'Body\']',
    ['http://www.w3.org/2001/10/xml-exc-c14n#'],
    ['http://www.w3.org/2001/04/xmlenc#sha256'],
    null, null,
    'ns'
  )
  signer.addReference(
    '//*[local-name(.)=\'Oppslagstjenesten\']',
    ['http://www.w3.org/2001/10/xml-exc-c14n#'],
    ['http://www.w3.org/2001/04/xmlenc#sha256'],
    null, null,
    'soap'
  )
  signer.signingKey = config.certPrivate
  signer.keyInfoProvider = new FileKeyInfo(keyId)
  signer.signatureAlgorithm = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256'
  signer.computeSignature(envelope, {
    prefix: 'ds',
    location: {
      reference: '//*[local-name(.)=\'Security\']',
      action: 'append'
    }
  })

  return signer.getSignedXml()
}
