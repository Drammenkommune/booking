import xmlBuilder from 'xmlbuilder'

export function artifactResolveEnvelope(artifactResolve) {
  const root = xmlBuilder
    .create('soap11:Envelope')
    .att('xmlns:soap11', 'http://schemas.xmlsoap.org/soap/envelope/')
    .ele('soap11:Body')
  root.raw(artifactResolve.split('<?xml version="1.0"?>')[1])
  return root.end()
}
