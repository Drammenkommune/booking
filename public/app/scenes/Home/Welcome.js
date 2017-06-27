import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import {Checkbox} from 'material-ui'

import {
  Card, CenterContent,
  Content, GridContainer,
  InlineText, PaddedButton,
} from '@/components'
import {theme} from '@/services'
import {DrammenLogo} from '@/icons'


const styles = StyleSheet.create({
  loginButton: {
    marginRight: 16,
    fontSize: 14,
    '@media (max-width: 480px)': {
      width: '100%',
      marginRight: 0,
      marginBottom: 16
    }
  },
  roomButton: {
    '@media (max-width: 480px)': {
      width: '100%'
    }
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
    paddingTop: 16,
  },
  textSize: {
    fontSize: 18,
    lineHeight: '24px'
  },
  responsiveLogo: {
    width: 270,
    paddingTop: 20,
    '@media (max-width: 768px)': {
      width: 220
    }
  }
})

const loginButton = {
  label: 'Logg inn',
  backgroundColor: theme.submitColor,
  color: '#FFF',
  className: css(styles.loginButton)
}

const roomButton = {
  label: 'Finn lokaler',
  href: '/#/lokale',
  backgroundColor: theme.submitColor,
  color: '#FFF',
  className: css(styles.roomButton)
}

class Welcome extends React.Component {

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

  render() {
    return (
      <GridContainer>
        <Card>
          <CenterContent>
            <div className={css(styles.responsiveLogo)}>
              <DrammenLogo width="100%"/>
            </div>
          </CenterContent>
          <Content>
            <h2 style={{padding: '16px 14px 12px', textAlign: 'center'}}>Velkommen til Drammen booking</h2>
            <InlineText className={css(styles.textSize)} style={{marginBottom: 16, textAlign: 'center'}}>
              Her kan du booke lokaler til møter, øvinger, treninger mm. i Drammen kommune
            </InlineText>
            <div style={{padding: 10, paddingBottom: 16, backgroundColor: '#F4F4F4'}}>
              <CenterContent>
                <Checkbox
                  onCheck={this.onHandleCheck}
                  label="Husk meg på denne enheten"
                  style={{marginBottom: 16, width: 260}}
                  labelStyle={{fontSize: 18}}/>
              </CenterContent>
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                <PaddedButton {...loginButton} onTouchTap={this.onHandleLogin}/>
                <PaddedButton {...roomButton}/>
              </div>
            </div>
            <div className={css(styles.linkContainer)}>
              <a href="/admin/" target="_blank" className={css(styles.textSize)}>
                Skoleinnlogging
              </a>
              <a href="/#/vilkar" className={css(styles.textSize)}>
                Vilkår
              </a>
            </div>
          </Content>
        </Card>
      </GridContainer>
    )
  }
}

export default Welcome
