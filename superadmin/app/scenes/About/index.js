import React from 'react'
import Relay from 'react-relay'
import Formsy from 'formsy-react'
import {FlatButton} from 'material-ui'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import {
  Card, Content, GridContainer,
  InlineText, ValidationInput, PaddedButton
} from '@/components'
import {formatNewLines, theme} from '@/services'
import {mutate} from '~/services'
import UpdateAboutServiceMutation from './mutations/UpdateAboutServiceMutation'

class About extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      currentValue: props.admin.aboutService
    }
    this.editMode = ::this.editMode
    this.onValidSubmit = ::this.onValidSubmit
    this.onHandleChange = ::this.onHandleChange
  }

  onHandleChange({aboutService}) {
    this.setState({currentValue: aboutService})
  }

  onValidSubmit({aboutService}) {
    const adminId = this.props.admin.id
    const mutation = new UpdateAboutServiceMutation({adminId, aboutService})
    mutate(mutation)
      .then(_ => this.setState({editMode: false}))
  }

  editMode() {
    this.setState({editMode: !this.state.editMode})
  }

  render() {
    const {admin} = this.props
    const {editMode, currentValue} = this.state

    return (
      <GridContainer>
        <Card
          title="Om tjenesten"
          dividerColor={theme.roomColor}
          action={(
            <FlatButton
              aria-label={editMode ? 'Avbryt' : 'Rediger'}
              style={{minWidth: 0, padding: '0 10px', marginBottom: 8}}
              onTouchTap={this.editMode}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
                <span style={{marginRight: 10}}>
                  {editMode ? 'Avbryt' : 'Rediger'}
                </span>
                {editMode
                  ? (<CloseIcon style={{height: 24, width: 24}}/>)
                  : (<EditIcon style={{height: 24, width: 24}} />)
                }
              </div>
            </FlatButton>
          )}>
          <Content>
            {editMode
              ? (
                <Formsy.Form
                  style={{display: 'flex', flexDirection: 'column'}}
                  onChange={this.onHandleChange}
                  onValidSubmit={this.onValidSubmit}>
                  <ValidationInput
                    name="aboutService"
                    required
                    multiLine={true}
                    value={admin.aboutService}
                  />
                  <PaddedButton
                    type="submit"
                    style={{marginLeft: 'auto'}}
                    color="#FFF"
                    backgroundColor={theme.submitColor}
                    label="Lagre"
                  />
                </Formsy.Form>
              )
              : (
                <InlineText>
                  {formatNewLines(admin.aboutService)}
                </InlineText>
              )
            }
          </Content>
        </Card>
        {editMode
          ? (
            <Card title="Forhåndsvisning" dividerColor={theme.roomColor}>
              <Content>
                <InlineText>
                  {formatNewLines(currentValue)}
                </InlineText>
              </Content>
            </Card>
          )
          : null
        }
      </GridContainer>
    )
  }
}

About.propTypes = {
  admin: React.PropTypes.object.isRequired
}

export default Relay.createContainer(About, {
  fragments: {
    admin: () => Relay.QL`
      fragment on Admin {
        id, aboutService
      }
    `
  }
})
