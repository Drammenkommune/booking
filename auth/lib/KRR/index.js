import xmlBuilder from 'xmlbuilder'
import decryptResponse from './decryptResponse'
import extractPersonInfo from './extractPersonInfo'
import fetchPersonEnvelope from './fetchPersonEnvelope'
import fetchPersonInfo from './fetchPersonInfo'
import signXml from './signXml'

export default function KRR(ssn, readyXML) {
  if (readyXML) {
    return fetchPersonInfo(readyXML)
      .then(decryptResponse)
      .then(decrypted => {
        return xmlBuilder
          .create('soap:Envelope')
          .att('xmlns:soap', 'http://www.w3.org/2003/05/soap-envelope')
          .ele('soap:Header').up()
          .ele('soap:Body')
          .raw(decrypted)
          .end()
      })
  } else {
    const xml = xmlBuilder.create({
      HentPersonerForespoersel: {
        '@xmlns': 'http://kontaktinfo.difi.no/xsd/oppslagstjeneste/16-02',
        '@xmlns:ns2': 'http://begrep.difi.no',
        informasjonsbehov: {
          '#text': 'Kontaktinfo'
        },
        personidentifikator: {
          '#text': ssn
        }
      }
    })
    const keyId = `X509-${new Date().getTime()}`
    const envelope = fetchPersonEnvelope(xml, keyId)

    const signedXml = signXml(envelope, keyId)
    return fetchPersonInfo(signedXml)
      .then(decryptResponse)
      .then(extractPersonInfo)
  }
}
