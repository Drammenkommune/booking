import React from 'react'
import Formsy from 'formsy-react'

import {
  Card, CenterContent, Content,
  GridContainer, PageTitle,
  PaddedButton, ValidationInput
} from '@/components'
import {theme} from '@/services'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const POSTALCODE_REGEX = /^\d{4}$/

class OwnerForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      validForm: false
    }
    this.onValid = ::this.onValid
    this.onInvalid = ::this.onInvalid
    this.onValidSubmit = ::this.onValidSubmit
  }

  onValid() {
    this.setState({validForm: true})
  }

  onInvalid() {
    this.setState({validForm: false})
  }

  onValidSubmit(values) {
    if (this.state.validForm) {
      this.props.onHandleSubmit(values)
    }
  }

  validEmail(value) {
    return !value || value.match(EMAIL_REGEX)
  }

  validPostalCode(value) {
    return !value || value.match(POSTALCODE_REGEX)
  }

  validationMessage(message) {
    return (
     <span
      key={message.split(' ').join('-')}
      style={{fontSize: 14, color: theme.errorColor}}>{message}</span>
   )
  }

  render() {
    const {owner} = this.props
    const inputStyle = {marginBottom: 10}
    return (
      <div>
        <PageTitle
          title={owner ? 'Rediger utleier' : 'Opprett utleier'}
          dividerColor={theme.roomColor}/>
        <Formsy.Form
          ref="ownerForm"
          onValid={this.onValid}
          onInvalid={this.onInvalid}
          onValidSubmit={this.onValidSubmit}>
          <GridContainer>
            <Card>
              <Content>
                <h3>Utleiers navn*:</h3>
                <ValidationInput
                  required
                  type="text"
                  name="name"
                  defaultValue={owner && owner.name}
                  style={inputStyle}/>
                <h3>Brukernavn (epost-adresse)*:</h3>
                <ValidationInput
                  required
                  type="text"
                  name="email"
                  defaultValue={owner && owner.email}
                  customValidations={{
                    validEmail: {
                      evaluator: this.validEmail,
                      message: this.validationMessage('Må være gyldig epost-adresse')
                    }
                  }}
                  style={inputStyle}/>
                {!owner && (
                  <div>
                    <h3>Passord*:</h3>
                    <ValidationInput
                      required
                      type="text"
                      name="password"
                      style={inputStyle}/>
                  </div>
                )}
                <h3>Adresse*:</h3>
                <ValidationInput
                  required
                  type="text"
                  name="address"
                  defaultValue={owner && owner.address}
                  style={inputStyle}/>
                <h3>Postnummer*:</h3>
                <ValidationInput
                  required
                  type="text"
                  name="postalCode"
                  defaultValue={owner && owner.postalCode}
                  customValidations={{
                    validEmai: {
                      evaluator: this.validPostalCode,
                      message: this.validationMessage('Må være gyldig postnummer')
                    }
                  }}
                  style={inputStyle}/>
                <h3>Poststed*:</h3>
                <ValidationInput
                  required
                  type="text"
                  name="postalArea"
                  defaultValue={owner && owner.postalArea}
                  style={inputStyle}/>
                <h3>Kontaktperson:</h3>
                <ValidationInput
                  type="text"
                  name="contactName"
                  defaultValue={owner && owner.contact && owner.contact.name}
                  style={inputStyle}/>
                <h3>Kontaktens telefonnummer:</h3>
                <ValidationInput
                  type="text"
                  name="contactPhone"
                  defaultValue={owner && owner.contact && owner.contact.phoneNumber}
                  style={inputStyle}/>
              </Content>
            </Card>
          </GridContainer>
          <CenterContent>
            {owner && (
              <PaddedButton
                label="Slett utleier"
                style={{marginRight: 20}}
                backgroundColor={theme.errorColor}
                onTouchTap={this.props.onHandleDelete}
              />
            )}
            <PaddedButton
              label={owner ? 'Lagre endringer' : 'Opprett utleier'}
              backgroundColor={theme.roomColor}
              disabled={!this.state.validForm}
              type="submit"/>
          </CenterContent>
        </Formsy.Form>
      </div>
    )
  }
}

OwnerForm.propTypes = {
  onHandleSubmit: React.PropTypes.func.isRequired,
  onHandleDelete: React.PropTypes.func,
  owner: React.PropTypes.object
}

export default OwnerForm
