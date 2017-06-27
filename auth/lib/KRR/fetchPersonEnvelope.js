import moment from 'moment'
import xmlBuilder from 'xmlbuilder'
import extractBase64Key from './extractBase64Key'
import config from '~/config'
const TIME_TO_LIVE = 120

export default function fetchPersonEnvelope(fetchPersonInfo, keyId) {
  const base64Key = extractBase64Key(config.certPublic)

  const wsse = xmlBuilder
    .create('wsse:Security')
    .att('xmlns:wsse', 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd')
    .att('xmlns:wsu', 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd')
    .att('soap:mustUnderstand', 'true')
    .ele('wsse:BinarySecurityToken')
    .att('EncodingType', 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary')
    .att('ValueType', 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3')
    .att('wsu:Id', keyId)
    .raw(base64Key).up()
    .ele('wsu:Timestamp')
    .ele('wsu:Created', new Date().toISOString()).up()
    .ele('wsu:Expires', moment(new Date()).add(TIME_TO_LIVE, 'seconds').toISOString()).up().up()


  const root = xmlBuilder
    .create('soap:Envelope')
    .att('xmlns:soap', 'http://www.w3.org/2003/05/soap-envelope')
    .att('xmlns:ns', 'http://kontaktinfo.difi.no/wsdl/oppslagstjeneste-16-02')
    .ele('soap:Header')
    .importDocument(wsse)

  if (config.onBehalfOfId) {
    root.ele('ns:Oppslagstjenesten')
      .att('xmlns:wsu', 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd')
      .ele('ns:PaaVegneAv', config.onBehalfOfId).up()
  }

  root.up().ele('soap:Body')
    .importDocument(fetchPersonInfo)

  return root.end()
}
