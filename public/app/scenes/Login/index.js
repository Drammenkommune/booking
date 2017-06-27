import React from 'react'
import {Checkbox} from 'material-ui'

import {
  ActionLink, Card, CenterContent, Content,
  GridContainer, InlineText, PaddedButton
} from '@/components'
import {theme, previousLocation} from '@/services'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      remember: false
    }
    this.onHandleCheck = ::this.onHandleCheck
    this.onHandleLogin = ::this.onHandleLogin
  }

  onHandleCheck(_, remember) {
    this.setState({remember})
  }

  onHandleLogin() {
    const {remember} = this.state
    if (remember) {
      sessionStorage.setItem('dk_public_remember_session', true)
    } else {
      // Remove in case it has been set
      sessionStorage.removeItem('dk_public_remember_session')
    }
    window.location = '/auth/login'
  }

  onCancel() {
    const back = previousLocation() || '/'
    window.location.replace(`/#${back}`)
  }

  render() {
    return (
      <GridContainer>
        <div>
          <Card title="Du er ikke logget inn" dividerColor="rgba(0, 0, 0, 0.12)">
            <Content>
              <InlineText>
                For å booke lokaler må du logge inn.
              </InlineText>
              <CenterContent>
                <PaddedButton
                  label="Logg inn"
                  color="#FFF"
                  onTouchTap={this.onHandleLogin}
                  style={{marginTop: 16}}
                  backgroundColor={theme.submitColor}/>
              </CenterContent>
              <CenterContent>
                <Checkbox
                  onCheck={this.onHandleCheck}
                  label="Husk meg på denne enheten"
                  style={{width: 300, marginTop: 16}}/>
              </CenterContent>
              <CenterContent>
                <ActionLink
                  onTouchTap={this.onCancel}
                  style={{marginTop: 16}}>
                  Avbryt
                </ActionLink>
              </CenterContent>
            </Content>
          </Card>
        </div>
      </GridContainer>
    )
  }
}

export default Login
