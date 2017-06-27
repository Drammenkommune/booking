import fetch from 'node-fetch'
import saml2 from 'saml2-js'
import config from '~/config'
import artifactResolve from './artifactResolve'
import {artifactResolveEnvelope} from './soap'
import getUserFromEncryptedData from './getUserFromEncryptedData'

const entityId = config.spEntityId

const spOptions = {
  entity_id: entityId,
  private_key: config.certPrivate,
  certificate: config.certPublic,
  assert_endpoint: config.assertEndpoint,
  force_authn: false,
  auth_context: {
    comparison: 'minimum',
    class_refs: ['urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport']
  },
  nameid_format: 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
  sign_get_request: true,
  allow_unencrypted_assertion: false
}

const idpOptions = {
  sso_login_url: config.ssoLoginUrl,
  sso_logout_url: config.ssoLogoutUrl,
  certificates: config.certsIdp
}

const sp = new saml2.ServiceProvider(spOptions)
const idp = new saml2.IdentityProvider(idpOptions)

function metadata() {
  return sp.create_metadata()
}

function createLoginUrl() {
  return new Promise((resolve) => {
    sp.create_login_request_url(idp, {}, (err, loginUrl) => {
      resolve(loginUrl)
    })
  })
}

function createLogoutUrl({nameId, sessionIndex}) {
  const options = {name_id: nameId, session_index: sessionIndex}
  return new Promise((resolve) => {
    sp.create_logout_request_url(idp, options, (err, logoutUrl) => {
      resolve(logoutUrl)
    })
  })
}

function getUserInfo(artifact) {
  const artifactResolveXml = artifactResolve(artifact, entityId)
  const envelope = artifactResolveEnvelope(artifactResolveXml)

  return fetch(config.idpPersonInfoUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml',
      SOAPAction: ''
    },
    body: envelope.toString()
  })
    .then(res => res.text())
    .then(getUserFromEncryptedData)
    .catch(console.log)
}

export default {
  metadata,
  createLoginUrl,
  createLogoutUrl,
  getUserInfo
}
