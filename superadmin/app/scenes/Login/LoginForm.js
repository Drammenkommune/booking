import React from 'react'
import Formsy from 'formsy-react'

import {Checkbox} from 'material-ui'
import {PaddedButton, ValidationInput} from '@/components'
import {theme} from '@/services'

class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      passwordVisible: false
    }
    this.onValidSubmit = ::this.onValidSubmit
    this.onHandlePasswordVisibility = ::this.onHandlePasswordVisibility
  }

  onValidSubmit({email, password}) {
    this.props.onValidSubmit(email, password)
  }

  onHandlePasswordVisibility(_, value) {
    this.setState({passwordVisible: value})
  }

  render() {
    const {userError, passwordError} = this.props
    return (
      <Formsy.Form
        ref="loginForm"
        onValidSubmit={this.onValidSubmit}>
        <ValidationInput
          required
          name="email"
          placeholder="Brukernavn (e-post addresse)"
          style={{fontFamily: 'sans-serif'}}
          errorMessage="Feil brukernavn, vennligst prøv igjen."
          error={userError}/>
        <ValidationInput
          required
          name="password"
          placeholder="Passord"
          errorMessage="Feil passord, vennligst prøv igjen."
          error={passwordError}
          style={{paddingRight: 32, fontFamily: 'sans-serif'}}
          type={this.state.passwordVisible ? 'text' : 'password'}/>
        <Checkbox
          name="showPassword"
          label="Vis passord"
          style={{marginTop: 10}}
          onCheck={this.onHandlePasswordVisibility}/>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <PaddedButton
            style={{marginTop: 16}}
            type="submit"
            label="Logg inn"
            color="#FFF"
            backgroundColor={theme.submitColor}
            onTouchTap={this.onValidSubmit}/>
        </div>
      </Formsy.Form>
    )
  }
}

LoginForm.propTypes = {
  onValidSubmit: React.PropTypes.func.isRequired,
  userError: React.PropTypes.bool.isRequired,
  passwordError: React.PropTypes.bool.isRequired,
}

export default LoginForm
