const BEGIN_CERT = '-----BEGIN CERTIFICATE-----'
const END_CERT = '-----END CERTIFICATE-----'

export default function extractBase64Key(key) {
  if (key.indexOf(BEGIN_CERT) === -1 || key.indexOf(END_CERT) === -1) {
    throw new Error('Provided PEM-format key does not contain certificate information! Try appending the certificate to the end of the file.')
  }
  const start = key.indexOf(BEGIN_CERT) + BEGIN_CERT.length
  const end = key.indexOf(END_CERT)
  const res = key.substring(start, end)
  return res.replace(/(\r\n|\n|\r)/gm, '')
}
