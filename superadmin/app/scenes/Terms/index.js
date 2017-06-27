import React from 'react'
import Relay from 'react-relay'
import {FlatButton} from 'material-ui'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import {Card, Content, GridContainer} from '@/components'
import {formatNewLinesAsPoints, theme} from '@/services'
import TermsForm from './TermsForm'

class About extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      currentValue: props.admin.termsAndAgreement,
    }
    this.editMode = ::this.editMode
    this.handleSuccessfulSubmit = ::this.handleSuccessfulSubmit
    this.onHandleChange = ::this.onHandleChange
  }

  onHandleChange(currentValue) {
    this.setState({currentValue})
  }

  handleSuccessfulSubmit() {
    this.setState({editMode: false})
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
          title="Vilkår"
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
                <TermsForm
                  admin={admin}
                  handleSuccessfulSubmit={this.handleSuccessfulSubmit}
                  onHandleChange={this.onHandleChange}
                />
              )
              : (
                <div>
                  {formatNewLinesAsPoints(admin.termsAndAgreement)}
                  {admin.pdfFile && (
                    <a href={admin.pdfFile.downloadUrl} target="_blank">Se utleiekontrakt</a>
                  )}
                </div>
              )
            }
          </Content>
        </Card>
        {editMode
          ? (
            <Card title="Forhåndsvisning" dividerColor={theme.roomColor}>
              <Content>
                {formatNewLinesAsPoints(currentValue)}
                {admin.pdfFile && (
                  <a href={admin.pdfFile.downloadUrl} target="_blank">Se utleiekontrakt</a>
                )}
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
        id, termsAndAgreement,
        pdfFile {
          name, downloadUrl
        }
      }
    `
  }
})
