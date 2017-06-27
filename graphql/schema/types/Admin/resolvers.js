import {pg} from '~/db'
import {v4 as uuid} from 'uuid'
import passwordHasher from '~/lib/utils/passwordHasher'
import generateJWT from '~/lib/utils/generateJWT'
import {norwegianAlphabeticalSort, s3Signer} from '~/lib/utils'
import roles from '~/lib/roles'

export const token = async (_, {email, password}) => {
  return pg.connection
      .first('*')
      .from('admins')
      .where({email})
      .then(async user => {
        if (!user) {
          throw new Error('No user')
        }
        const hash = await passwordHasher(password, user.salt)
        if (user.password === hash) {
          return generateJWT(user.id, {...user, role: roles.ADMIN})
        } else {
          throw new Error('Wrong password')
        }
      })
}

export const owners = (admin) => {
  if (admin.id && admin.email) {
    return pg.connection
      .select('*')
      .from('owners')
      .where({deleted: false})
      .then(owners => norwegianAlphabeticalSort(owners, 'name'))
  } else {
    return []
  }
}

export const aboutService = () => {
  return pg.connection.first('aboutService').from('admins').then(({aboutService}) => aboutService)
}

export const termsAndAgreement = () => {
  return pg.connection.first('termsAndAgreement').from('admins').then(({termsAndAgreement}) => termsAndAgreement)
}

export const pdfFile = ({pdfDownloadUrl, pdfFileName}) => {
  return pdfDownloadUrl && pdfFileName
    ? {
      id: uuid(),
      downloadUrl: pdfDownloadUrl,
      name: pdfFileName
    }
    : null
}

export const uploadUrl = ({id}, {filename, filetype}) => {
  return s3Signer(`superadmin${id}`, filename, filetype)
}
