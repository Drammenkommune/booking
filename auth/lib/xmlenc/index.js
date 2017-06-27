import crypto from 'crypto'
import async from 'async'
import xmldom from 'xmldom'
import xpath from 'xpath'
import utils from './utils'
import {pki} from 'node-forge'

/* eslint-disable no-magic-numbers */
function encryptKeyInfoWithScheme(symmetricKey, options, scheme, callback) {
  try {
    const rsa_pub = pki.publicKeyFromPem(options.rsa_pub)
    const encrypted = rsa_pub.encrypt(symmetricKey.toString('binary'), scheme)
    const base64EncodedEncryptedKey = new Buffer(encrypted, 'binary').toString('base64')

    const params = {
      encryptedKey:  base64EncodedEncryptedKey,
      encryptionPublicCert: `<X509Data><X509Certificate>${utils.pemToCert(options.pem.toString())}</X509Certificate></X509Data>`,
      keyEncryptionMethod: options.keyEncryptionAlgorighm
    }

    const result = utils.renderTemplate('keyinfo', params)
    return callback(null, result)
  } catch (e) {
    return callback(e)
  }
}

function encryptWithAlgorithm(algorithm, symmetricKey, ivLength, content, encoding, callback) {
  // create a random iv for algorithm
  crypto.randomBytes(ivLength, function(err, iv) {
    if (err) return callback(err)

    const cipher = crypto.createCipheriv(algorithm, symmetricKey, iv)
    // encrypted content
    const encrypted = cipher.update(content, encoding, 'binary') + cipher.final('binary')
    return callback(null, Buffer.concat([iv, new Buffer(encrypted, 'binary')]))
  })
}

function encryptKeyInfo(symmetricKey, options, callback) {
  if (!options) {
    return callback(new Error('must provide options'))
  }
  if (!options.rsa_pub) {
    return callback(new Error('must provide options.rsa_pub with public key RSA'))
  }
  if (!options.pem) {
    return callback(new Error('must provide options.pem with certificate'))
  }

  if (!options.keyEncryptionAlgorighm) {
    return callback(new Error('encryption without encrypted key is not supported yet'))
  }

  switch (options.keyEncryptionAlgorighm) {
    case 'http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p':
      return encryptKeyInfoWithScheme(symmetricKey, options, 'RSA-OAEP', callback)

    case 'http://www.w3.org/2001/04/xmlenc#rsa-1_5':
      return encryptKeyInfoWithScheme(symmetricKey, options, 'RSAES-PKCS1-V1_5', callback)

    default:
      return callback(new Error('encryption key algorithm not supported'))
  }
}

function encrypt(content, options, callback) {
  if (!options) {
    return callback(new Error('must provide options'))
  }
  if (!content) {
    return callback(new Error('must provide content to encrypt'))
  }
  if (!options.rsa_pub) {
    return callback(new Error('rsa_pub option is mandatory and you should provide a valid RSA public key'))
  }
  if (!options.pem) {
    return callback(new Error('pem option is mandatory and you should provide a valid x509 certificate encoded as PEM'))
  }

  options.input_encoding = options.input_encoding || 'utf8'

  async.waterfall([
    function generate_symmetric_key(cb) {
      switch (options.encryptionAlgorithm) {
        case 'http://www.w3.org/2001/04/xmlenc#aes128-cbc':
          crypto.randomBytes(16, cb) // generate a symmetric random key 16 bytes length
          break
        case 'http://www.w3.org/2001/04/xmlenc#aes256-cbc':
          crypto.randomBytes(32, cb) // generate a symmetric random key 32 bytes length
          break
        case 'http://www.w3.org/2001/04/xmlenc#tripledes-cbc':
          crypto.randomBytes(24, cb) // generate a symmetric random key 24 bytes (192 bits) length
          break
        default:
          crypto.randomBytes(32, cb) // generate a symmetric random key 32 bytes length
      }
    },
    function encrypt_content(symmetricKey, cb) {
      switch (options.encryptionAlgorithm) {
        case 'http://www.w3.org/2001/04/xmlenc#aes128-cbc':
          encryptWithAlgorithm('aes-128-cbc', symmetricKey, 16, content, options.input_encoding, function(err, encryptedContent) {
            if (err) return cb(err)
            return cb(null, symmetricKey, encryptedContent)
          })
          break
        case 'http://www.w3.org/2001/04/xmlenc#aes256-cbc':
          encryptWithAlgorithm('aes-256-cbc', symmetricKey, 16, content, options.input_encoding, function(err, encryptedContent) {
            if (err) return cb(err)
            return cb(null, symmetricKey, encryptedContent)
          })
          break
        case 'http://www.w3.org/2001/04/xmlenc#tripledes-cbc':
          encryptWithAlgorithm('des-ede3-cbc', symmetricKey, 8, content, options.input_encoding, function(err, encryptedContent) {
            if (err) return cb(err)
            return cb(null, symmetricKey, encryptedContent)
          })
          break
        default:
          return cb(new Error('encryption algorithm not supported'))
      }
    },
    function encrypt_key(symmetricKey, encryptedContent, cb) {
      encryptKeyInfo(symmetricKey, options, function(err, keyInfo) {
        if (err) return cb(err)

        const result = utils.renderTemplate('encrypted-key', {
          encryptedContent: encryptedContent.toString('base64'),
          keyInfo,
          contentEncryptionMethod: options.encryptionAlgorithm
        })

        return cb(null, result)
      })
    }
  ], callback)
}

function decryptKeyInfoWithScheme(encryptedKey, options, scheme) {
  try {
    const key = new Buffer(encryptedKey.textContent, 'base64').toString('binary')
    const private_key = pki.privateKeyFromPem(options.key)
    const decrypted = private_key.decrypt(key, scheme)
    return new Buffer(decrypted, 'binary')
  }
  catch (e) {
    throw e
  }
}

function decryptKeyInfo(originalDoc, options) {
  const doc = typeof originalDoc === 'string'
    ? new xmldom.DOMParser().parseFromString(originalDoc)
    : originalDoc

  let keyRetrievalMethodUri
  const keyInfo = xpath.select('//*[local-name(.)=\'KeyInfo\' and namespace-uri(.)=\'http://www.w3.org/2000/09/xmldsig#\']', doc)[0]
  let keyEncryptionMethod = xpath.select('//*[local-name(.)=\'EncryptedKey\']/*[local-name(.)=\'EncryptionMethod\']', doc)[0]

  if (!keyEncryptionMethod) { // try with EncryptedData->KeyInfo->RetrievalMethod
    const keyRetrievalMethod = xpath.select('//*[local-name(.)=\'EncryptedData\']/*[local-name(.)=\'KeyInfo\']/*[local-name(.)=\'RetrievalMethod\']', doc)[0]
    keyRetrievalMethodUri = keyRetrievalMethod ? keyRetrievalMethod.getAttribute('URI') : null
    keyEncryptionMethod = keyRetrievalMethodUri ? xpath.select(`//*[local-name(.)='EncryptedKey' and @Id='"${keyRetrievalMethodUri.substring(1)}"']/*[local-name(.)='EncryptionMethod']`, doc)[0] : null
  }

  if (!keyEncryptionMethod) {
    throw new Error('cant find encryption algorithm')
  }

  const keyEncryptionAlgorighm = keyEncryptionMethod.getAttribute('Algorithm')
  const encryptedKey = keyRetrievalMethodUri ?
    xpath.select(`//*[local-name(.)='EncryptedKey' and @Id='${keyRetrievalMethodUri.substring(1)}']/*[local-name(.)='CipherData']/*[local-name(.)='CipherValue']`, keyInfo)[0] :
    xpath.select('//*[local-name(.)=\'CipherValue\']', keyInfo)[0]

  switch (keyEncryptionAlgorighm) {
    case 'http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p':
      return decryptKeyInfoWithScheme(encryptedKey, options, 'RSA-OAEP')
    case 'http://www.w3.org/2001/04/xmlenc#rsa-1_5':
      return decryptKeyInfoWithScheme(encryptedKey, options, 'RSAES-PKCS1-V1_5')
    default:
      throw new Error(`key encryption algorithm ${keyEncryptionAlgorighm} not supported`)
  }
}

function decrypt(xml, options, callback) {
  if (!options) {
    return callback(new Error('must provide options'))
  }
  if (!xml) {
    return callback(new Error('must provide XML to encrypt'))
  }
  if (!options.key) {
    return callback(new Error('key option is mandatory and you should provide a valid RSA private key'))
  }

  let decrypted

  try {
    const doc = typeof xml === 'string' ? new xmldom.DOMParser().parseFromString(xml) : xml

    const symmetricKey = decryptKeyInfo(doc, options)
    const encryptionMethod = xpath.select('//*[local-name(.)=\'EncryptedData\']/*[local-name(.)=\'EncryptionMethod\']', doc)[0]
    const encryptionAlgorithm = encryptionMethod.getAttribute('Algorithm')

    let decipher, padding
    const encryptedContent = xpath.select('//*[local-name(.)=\'EncryptedData\']/*[local-name(.)=\'CipherData\']/*[local-name(.)=\'CipherValue\']', doc)[0]

    const encrypted = new Buffer(encryptedContent.textContent, 'base64')

    switch (encryptionAlgorithm) {
      case 'http://www.w3.org/2001/04/xmlenc#aes128-cbc':
        decipher = crypto.createDecipheriv('aes-128-cbc', symmetricKey, encrypted.slice(0, 16))

        decipher.setAutoPadding(false)
        decrypted = decipher.update(encrypted.slice(16), null, 'binary') + decipher.final('binary')

        // Remove padding bytes equal to the value of the last byte of the returned data.
        padding = decrypted.charCodeAt(decrypted.length - 1)
        if (padding >= 1 && padding <= 16) {
          decrypted = decrypted.substr(0, decrypted.length - padding)
        } else {
          callback(new Error('padding length invalid'))
          return
        }

        decrypted = new Buffer(decrypted, 'binary').toString('utf8')
        break
      case 'http://www.w3.org/2001/04/xmlenc#aes256-cbc':
        decipher = crypto.createDecipheriv('aes-256-cbc', symmetricKey, encrypted.slice(0, 16))

        decipher.setAutoPadding(false)
        decrypted = decipher.update(encrypted.slice(16), null, 'binary') + decipher.final('binary')

        // Remove padding bytes equal to the value of the last byte of the returned data.
        padding = decrypted.charCodeAt(decrypted.length - 1)
        if (padding >= 1 && padding <= 16) {
          decrypted = decrypted.substr(0, decrypted.length - padding)
        } else {
          callback(new Error('padding length invalid'))
          return
        }
        decrypted = new Buffer(decrypted, 'binary').toString('utf8')
        break
      case 'http://www.w3.org/2001/04/xmlenc#tripledes-cbc':
        decipher = crypto.createDecipheriv('des-ede3-cbc', symmetricKey, encrypted.slice(0, 8))
        decrypted = decipher.update(encrypted.slice(8), null, 'binary') + decipher.final('binary')
        decrypted = new Buffer(decrypted, 'binary').toString('utf8')
        break
      default:
        return callback(new Error(`encryption algorithm ${encryptionAlgorithm} not supported`))
    }
  } catch (e) {
    return callback(e)
  }

  callback(null, decrypted)
}

export default {
  decrypt,
  encrypt,
  encryptKeyInfo,
  decryptKeyInfo
}
