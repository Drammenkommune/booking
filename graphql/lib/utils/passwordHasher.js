import crypto from 'crypto'

const iterations = 1000
const keyLength = 512
const cryptoFunction = 'sha512'

// Returns the hash for a given password/salt pair
export default (password, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keyLength, cryptoFunction, (err, key) => {
      if (err) {
        reject(err)
      }
      resolve(key.toString('hex'))
    })
  })
}
