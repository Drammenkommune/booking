import xmlBuilder from 'xmlbuilder'
import {SignedXml} from 'xml-crypto'
import crypto from 'crypto'
import config from '~/config'

const numberOfBytes = 21

/*
<samlp:Extensions xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol">
<idpe:OnBehalfOf xmlns:idpe="https://idporten.difi.no/idportenextensions">TJENESTEEIER</idpe:OnBehalfOf>
</samlp:Extensions>
*/

export default (artifact, entityId) => {
  const uniqueId = `_${crypto.randomBytes(numberOfBytes).toString('hex')}`

  const xml = xmlBuilder.create({
    'saml2p:ArtifactResolve': {
      '@xmlns:saml2p': 'urn:oasis:names:tc:SAML:2.0:protocol',
      '@ID': uniqueId,
      '@IssueInstant': new Date().toISOString(),
      '@Version': '2.0',
      'saml2:Issuer': {
        '@xmlns:saml2': 'urn:oasis:names:tc:SAML:2.0:assertion',
        '#text': entityId
      },
      // 'samlp:Extensions': {
      //   '@xmlns:samlp': 'urn:oasis:names:tc:SAML:2.0:protocol',
      //   'idpe:OnBehalfOf': {
      //     '@xmlns:idpe': 'https://idporten.difi.no/idportenextensions',
      //     '#text': config.onBehalfOfId
      //   }
      // },
      'saml2p:Artifact': {
        '#text': artifact
      }
    }
  })

  const signer = new SignedXml()
  signer.addReference(
    '//*[local-name(.)=\'ArtifactResolve\']',
    [
      'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
      'http://www.w3.org/2001/10/xml-exc-c14n#'
    ]
  )
  signer.signingKey = config.certPrivate
  signer.computeSignature(xml.end(), {
    prefix: 'ds',
    location: {
      reference: '//*[local-name(.)=\'Artifact\']',
      action: 'before'
    }
  })

  return signer.getSignedXml()
}
