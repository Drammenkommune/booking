import React from 'react'
import Relay from 'react-relay'

import {
  Card, CardTitle, Content,
  GridContainer, InlineText
} from '@/components'
import {injectNetworkLayer} from '@/services'
import {DrammenLogo} from '@/icons'
import {Header} from '~/components'
import LoginForm from './LoginForm'

const NO_USER_ERROR = 'No user'
const WRONG_PASSWORD_ERROR = 'Wrong password'

class Login extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      canSubmit: false,
      userError: false,
      passwordError: false
    }
    this.onValidSubmit = ::this.onValidSubmit
    this.handleError = ::this.handleError
  }

  componentWillMount() {
    const {router} = this.context
    const {admin} = this.props
    const token = localStorage.getItem('dk_superadmin_token')

    if (admin && admin.id && admin.name && token) {
      router.replace('/')
    }
  }

  injectRelayNetworkLayer(token) {
    injectNetworkLayer(token, 'dk_superadmin_token', '/superadmin/#/logg-inn')
  }

  handleError(error) {
    this.setState({
      userError: error && error.message === NO_USER_ERROR,
      passwordError: error && error.message === WRONG_PASSWORD_ERROR
    })
  }

  getToken(email, password) {
    return new Promise((resolve, reject) => {
      const query = Relay.createQuery(Relay.QL`
        query {
          admin {
            token(email: $email, password: $password)
          }
        }
      `, {email, password})
      Relay.Store.primeCache({query}, readyState => {
        if (readyState.error) {
          reject(readyState.error.source.errors[0])
        }
        if (readyState.done) {
          const data = Relay.Store.readQuery(query)[0]
          resolve(data.token)
        }
      })
    })
  }

  onValidSubmit(email, password) {
    this.getToken(email, password)
      .then(token => {
        if (token) {
          localStorage.setItem('dk_superadmin_token', token)
          this.injectRelayNetworkLayer(token)
          this.context.router.push('/')
        }
      })
      .catch(this.handleError)
  }

  render() {
    const {userError, passwordError} = this.state
    return (
      <div>
        <Header />
        <GridContainer>
          <div>
            <Card>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <DrammenLogo width="175"/>
              </div>
              <CardTitle
                title="Velkommen"
                dividerColor="rgba(0, 0, 0, 0.12)"/>
              <Content>
                <InlineText>Logg inn med brukernavn og passord.</InlineText>
                <LoginForm
                  ref="LoginForm"
                  onValidSubmit={this.onValidSubmit}
                  userError={userError}
                  passwordError={passwordError}/>
              </Content>
            </Card>
          </div>
        </GridContainer>
      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

Login.propTypes = {
  admin: React.PropTypes.object.isRequired
}

export default Relay.createContainer(Login, {
  fragments: {
    admin: () => Relay.QL`
      fragment on Admin {
        id, email
      }
    `
  }
})
