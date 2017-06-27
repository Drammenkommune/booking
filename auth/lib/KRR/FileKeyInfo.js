import xmlBuilder from 'xmlbuilder'

export default class FileKeyInfo {
  constructor(keyId) {
    this.keyId = keyId
  }

  getKeyInfo() {
    const keyInfo = xmlBuilder
      .create('wsse:SecurityTokenReference')
      .att('wsu:Id', `STR-${new Date().getTime()}`)
      .ele('wsse:Reference')
      .att('URI', `#${this.keyId}`)
      .att('ValueType', 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3')
      .end()
      .split('<?xml version="1.0"?>')[1]

    return keyInfo
  }
}
