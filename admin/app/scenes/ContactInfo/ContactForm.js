import React from 'react'
import Formsy from 'formsy-react'
import {FlatButton} from 'material-ui'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'

import {
  BoldText, Card, CenterContent,
  Content, PaddedButton, ValidationInput
} from '@/components'
import {theme} from '@/services'
import {snackbar} from '~/services'
import styles from './styles'

class ContactForm extends React.Component {

  constructor(props) {
    super(props)
    const {contact: {name, phoneNumber}} = props.owner
    this.state = {
      editMode: !name || !phoneNumber
    }
    this.editMode = ::this.editMode
    this.onValidSubmit = ::this.onValidSubmit
  }

  onValidSubmit({name, phoneNumber}) {
    this.props.handleContactSubmit({contactName: name, contactPhone: phoneNumber})
      .then(_ => {
        this.setState({editMode: false})
        snackbar('Kontaktperson oppdatert')
      })
  }

  editMode() {
    this.setState({editMode: true})
  }

  render() {
    const {editMode} = this.state
    const {owner: {contact}} = this.props

    return (
      <Card
        title="Kontaktperson"
        dividerColor={theme.roomColor}
        style={{width: '100%'}}
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
              <BoldText>Navn*</BoldText>
              <ValidationInput
                name="name"
                type="text"
                required
                disabled={!editMode}
                placeholder="Navn"
                defaultValue={contact.name}
                style={styles.input}/>
            </label>
            <label style={styles.fullWidth}>
              <BoldText>Telefonnummer*</BoldText>
              <ValidationInput
                name="phoneNumber"
                type="text"
                required
                disabled={!editMode}
                placeholder="Telefonnummer"
                defaultValue={contact.phoneNumber}
                style={styles.input}/>
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

ContactForm.propTypes = {
  owner: React.PropTypes.object.isRequired,
  handleContactSubmit: React.PropTypes.func.isRequired
}

export default ContactForm
