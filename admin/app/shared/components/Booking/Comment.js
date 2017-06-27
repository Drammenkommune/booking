import React from 'react'
import {FlatButton} from 'material-ui'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import {Card, Content, PaddedButton, ValidationInput} from '@/components'
import {theme, formatNewLines} from '@/services'


class Comment extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      comment: false,
      submitting: false
    }
    this.openCommentField = ::this.openCommentField
    this.onValidSubmit = ::this.onValidSubmit
  }

  onValidSubmit({ownerComment}) {
    this.setState({submitting: true})
    this.props.onOwnerComment(ownerComment)
      .then(_ => this.setState({submitting: false, comment: false}))
  }

  openCommentField() {
    this.setState({comment: true})
  }

  render() {
    const {ownerComment} = this.props.booking
    const {comment, submitting} = this.state
    return (
      <Card
        title="Kommentar"
        dividerColor={theme.bookingColor}
        action={!comment && ownerComment && (
          <FlatButton
            aria-label="Rediger kommentar"
            style={{minWidth: 0, padding: '0 10px', marginBottom: 8}}
            onTouchTap={this.openCommentField}>
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
          <p style={{margin: 0}}>Kommentarer er bare synlige for skolen.</p>
          {comment && (
            <Formsy.Form
              onValidSubmit={this.onValidSubmit}
              style={{display: 'flex', flexDirection: 'column'}}>
              <ValidationInput
                name="ownerComment"
                multiLine={true}
                disabled={submitting}
                style={{minHeight: 150}}
                defaultValue={ownerComment || ''}/>
              <PaddedButton
                label="Lagre kommentar"
                type="submit"
                color="#FFF"
                style={{marginTop: 10, marginLeft: 'auto'}}
                backgroundColor={theme.submitColor} />
            </Formsy.Form>
          )}
          {!comment && ownerComment && (
            <div style={{borderTop: '1px solid #D2D2D2', marginTop: 10, paddingTop: 10}}>
              <p style={{margin: 0}}>
                {formatNewLines(ownerComment)}
              </p>
            </div>
          )}
          {!comment && !ownerComment && (
              <PaddedButton
                label="Skriv kommentar"
                color="#FFF"
                style={{marginTop: 10}}
                onTouchTap={this.openCommentField}
                backgroundColor={theme.submitColor}/>
          )}
        </Content>
      </Card>
    )
  }
}


Comment.propTypes = {
  booking: React.PropTypes.object.isRequired,
  onOwnerComment: React.PropTypes.func.isRequired
}

export default Comment
