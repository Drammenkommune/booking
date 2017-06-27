import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import Formsy from 'formsy-react'
import {FlatButton} from 'material-ui'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import styles from './styles'

import {
  BoldText, Card, CenterContent, Content,
  ValidationInput, PaddedButton
} from '@/components'
import {theme} from '@/services'
import {snackbar} from '~/services'


const responsiveInput = StyleSheet.create({
  input: {
    marginBottom: 10,
    '@media (max-width: 760px)': {
      width: '100%',
      marginRight: 0
    }
  }
}).input

const POSTALCODE_REGEX = /^\d{4}$/
const POSTALCODE_PATTERN = '[0-9]{4}'

class AddressForm extends React.Component {

  constructor(props) {
    super(props)
    const {address, postalCode, postalArea} = props.owner
    this.state = {
      editMode: !address || !postalCode || !postalArea
    }
    this.editMode = ::this.editMode
    this.onValidSubmit = ::this.onValidSubmit
  }

  editMode() {
    this.setState({editMode: true})
  }

  validPostalCode(value) {
    return !value || value.match(POSTALCODE_REGEX)
  }

  validationMessage(message) {
    return (
     <span
      key={message.split(' ').join('-')}
      style={styles.error}>{message}</span>
    )
  }

  onValidSubmit(values) {
    this.props.onHandleSubmit(values)
      .then(_ => {
        this.setState({editMode: false})
        snackbar('Adresse oppdatert')
      })
  }

  render() {
    const {owner} = this.props
    const {editMode} = this.state

    return (
      <Card
        title="Adresse"
        dividerColor={theme.roomColor}
        action={!editMode && (
          <FlatButton
            aria-label="Rediger"
            style={{minWidth: 0, padding: '0 10px', marginBottom: 8}}
            onTouchTap={this.editMode}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
              <span style={{marginRight: 10}}>Rediger</span>
              <EditIcon style={{height: 24, width: 24}} />
            </div>
          </FlatButton>
        )}>
        <Content>
          <Formsy.Form
            style={styles.form}
            onValidSubmit={this.onValidSubmit}>
            <label style={styles.fullWidth}>
              <BoldText>Adresse*</BoldText>
              <ValidationInput
                disabled={!editMode}
                style={styles.input}
                name="address"
                type="text"
                required
                defaultValue={owner.address}
                placeholder="Adresse"/>
            </label>
            <label className={css(responsiveInput)} style={styles.zipCode}>
              <BoldText>Postnummer*</BoldText>
              <ValidationInput
                disabled={!editMode}
                style={styles.input}
                name="postalCode"
                type="text"
                pattern={POSTALCODE_PATTERN}
                customValidations={{
                  validPostalCode: {
                    evaluator: this.validPostalCode,
                    message: this.validationMessage('Må være gyldig postnummer')
                  }
                }}
                required
                defaultValue={owner.postalCode}
                placeholder="Postnummer"/>
            </label>
            <label className={css(responsiveInput)} style={styles.fill}>
              <BoldText>Poststed*</BoldText>
              <ValidationInput
                disabled={!editMode}
                style={styles.input}
                name="postalArea"
                type="text"
                required
                defaultValue={owner.postalArea}
                placeholder="Poststed"/>
            </label>
            {editMode && (
              <div style={{width: '100%', marginTop: 16}}>
                <CenterContent>
                  <PaddedButton
                    type="submit"
                    label="Lagre"
                    color="#FFF"
                    backgroundColor={theme.submitColor}/>
                </CenterContent>
              </div>
            )}
          </Formsy.Form>
        </Content>
      </Card>
    )
  }
}


AddressForm.propTypes = {
  owner: React.PropTypes.object,
  onHandleSubmit: React.PropTypes.func.isRequired
}

export default AddressForm
