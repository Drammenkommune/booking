import React from 'react'
import Relay from 'react-relay'
import Formsy from 'formsy-react'
import {IconButton} from 'material-ui'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import {ActionLink, CardTitle, ValidationInput, PaddedButton} from '@/components'
import {theme} from '@/services'
import {snackbar, mutate} from '~/services'
import UpdateTermsAndAgreementMutation from './mutations/UpdateTermsAndAgreementMutation'

const styles = {
  fileInput: {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,
    opacity: 0, width: '100%',
    cursor: 'pointer'
  },
  chosenFileContainer: {
    marginBottom: 10,
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  chosenText: {
    height: 22,
    whiteSpace: 'nowrap'
  },
  overflow: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
}

class TermsForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      notPdf: false,
      currentFile: props.admin.pdfFile
    }
    this.onValidSubmit = ::this.onValidSubmit
    this.onHandleChange = ::this.onHandleChange
    this.handleFileChange = ::this.handleFileChange
    this.removeFile = ::this.removeFile
  }

  removeFile() {
    this.setState({currentFile: null})
    this.refs.fileInput.value = ''
  }

  onHandleChange({termsAndAgreement}) {
    this.props.onHandleChange(termsAndAgreement)
  }

  getSignedUrl(filename, filetype) {
    return new Promise((resolve) => {
      const query = Relay.createQuery(Relay.QL`
        query {
          admin {
            uploadUrl(filename: $filename, filetype: $filetype)
          }
        }
      `, {filename, filetype})
      Relay.Store.primeCache({query}, readyState => {
        if (readyState.done) {
          const data = Relay.Store.readQuery(query)[0]
          resolve(data.uploadUrl)
        }
      })
    })
  }

  uploadFile(file, url) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file
    })
    .then(res => res.url.substring(0, res.url.indexOf('?')))
  }

  onValidSubmit({termsAndAgreement}) {
    const adminId = this.props.admin.id
    const {currentFile, newFile} = this.state
    if (currentFile && newFile) {
      this.getSignedUrl(currentFile.name, currentFile.type)
        .then(url => this.uploadFile(currentFile, url))
        .then(url => {
          const mutation = new UpdateTermsAndAgreementMutation({
            adminId,
            termsAndAgreement,
            pdfDownloadUrl: url,
            pdfFileName: currentFile.name
          })

          mutate(mutation)
            .then(_ => this.props.handleSuccessfulSubmit())
        })
    } else {
      const options = {
        adminId,
        termsAndAgreement,
        pdfDownloadUrl: currentFile ? undefined : '',
        pdfFileName: currentFile ? undefined : ''
      }
      const mutation = new UpdateTermsAndAgreementMutation(options)
      mutate(mutation)
        .then(_ => this.props.handleSuccessfulSubmit())
    }
  }

  handleFileChange(ev) {
    const files = ev.target.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type !== 'application/pdf') {
        snackbar('Filen må være en PDF-fil')
        this.setState({notPdf: true})
        return
      }
      this.setState({currentFile: file, newFile: true, notPdf: false})
    }
  }

  render() {
    const {admin} = this.props
    const {notPdf, currentFile, newFile} = this.state

    return (
      <Formsy.Form
        style={{display: 'flex', flexDirection: 'column'}}
        onChange={this.onHandleChange}
        onValidSubmit={this.onValidSubmit}>
        <ValidationInput
          name="termsAndAgreement"
          required
          multiLine={true}
          value={admin.termsAndAgreement}
        />
        <div style={{margin: '0px -16px'}}>
          <CardTitle
            title="Kontrakt"
            dividerColor={theme.roomColor}
          />
        </div>
        <ActionLink
          style={{
            margin: '10px 0',
            verticalAlign: 'middle',
            alignSelf: 'flex-start',
            position: 'relative'
          }}>
          Last opp kontrakt (PDF)
          <input
            type="file"
            ref="fileInput"
            style={styles.fileInput}
            name="pdfFile"
            multiple={false}
            onChange={this.handleFileChange}/>
        </ActionLink>
        {notPdf && (<span style={{color: 'red'}}>Filen må være av typen PDF</span>)}
        {currentFile && (
          <div style={styles.chosenFileContainer}>
            {newFile
              ? (
                <span style={styles.chosenText}>Valgt fil: </span>
              )
              : (<span style={styles.chosenText}>Opplastet fil: </span>
              )
            }
            {newFile
              ? (
                <span style={styles.overflow} title={currentFile.name}>
                  {currentFile.name}
                </span>
              )
              : (
                <a
                  href={currentFile.downloadUrl}
                  target="_blank"
                  style={styles.overflow}
                  title={currentFile.name}
                >
                  {currentFile.name}
                </a>
              )
            }
            <IconButton aria-label="Fjern fil" onTouchTap={this.removeFile}>
              <ClearIcon color="red"/>
            </IconButton>
          </div>
        )}
        <PaddedButton
          type="submit"
          style={{marginLeft: 'auto'}}
          color="#FFF"
          backgroundColor={theme.submitColor}
          label="Lagre"
        />
      </Formsy.Form>
    )
  }
}

TermsForm.propTypes = {
  admin: React.PropTypes.object.isRequired,
  handleSuccessfulSubmit: React.PropTypes.func.isRequired,
  onHandleChange: React.PropTypes.func.isRequired,
}

export default TermsForm
