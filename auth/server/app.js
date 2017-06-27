import express from 'express'
import jwt from 'jsonwebtoken'
import config from '~/config'
import {pg} from '~/db'
import {saml, generateJWT, KRR} from '~/lib'

pg.connect()

const server = express()

server.use('/auth/login', (req, res) => {
  saml.createLoginUrl()
    .then(url => {
      res.redirect(url)
    })
})

server.use('/auth/logout', (req, res) => {
  const {token, SAMLResponse} = req.query
  if (token) {
    const user = jwt.verify(token, config.jwtSecret)
    pg.connection
      .first('nameId', 'sessionIndex')
      .from('users')
      .where({ssn: user.ssn})
      .then(({nameId, sessionIndex}) => {
        saml.createLogoutUrl({nameId, sessionIndex})
          .then(url => {
            res.redirect(url)
          })
      })
  } else if (SAMLResponse) {
    res.redirect(config.publicUrl)
  }
})

server.use('/auth/update', (req, res) => {
  KRR(req.query.ssn)
    .then(response => {
      res.send(JSON.stringify(response))
    })
})

server.use('/auth/updateRequest', (req, res) => {
  let xml = ''
  req.on('data', chunk => {
    xml += chunk
  })
  req.on('end', _ => {
    KRR(_, xml)
      .then(response => {
        res.set('Content-type', 'application/soap+xml;charset=utf-8')
        res.send(response)
      })
  })
})

server.use('/auth/assert', (req, res) => {
  const artifact = req.query.SAMLart
  if (config.demoArtifact && artifact === config.demoArtifact) {
    console.log('Demo login')
    pg.connection
      .first('*')
      .from('users')
      .where({id: config.demoUserId})
      .then(user => {
        const token = generateJWT(user.id, user)
        res.redirect(`${config.publicUrl}#/authenticated?token=${token}`)
      })
  } else {
    saml.getUserInfo(artifact)
      .then(user => {
        if (!user.phone || !user.email) {
          res.redirect(`${config.publicUrl}#/manglende-info`)
        }
        // No phone or no email = redirect to error page
        // No name = redirect to authenticated with noname = true
        const token = generateJWT(user.id, user)
        res.redirect(`${config.publicUrl}#/authenticated?token=${token}${user.name ? '' : '&noname=true'}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect(config.publicUrl)
      })
  }
})

server.use('/auth/meta', (req, res) => {
  const metadata = saml.metadata()
  res.send(metadata)
})


export default server
