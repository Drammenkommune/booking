import React from 'react'
import Formsy from 'formsy-react'

import AgreementOverlay from './AgreementOverlay'
import {
  ActionLink, CheckboxWithLink,
  GridContainer, PageTitle, PaddedButton,
  RecurringEvents
} from '@/components'
import {theme} from '@/services'
import UserInfo from './UserInfo'
import BookingTime from './BookingTime'
import LocationAndComment from './LocationAndComment'
import RoomInfo from './RoomInfo'

const centerContainer = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center'
}

const linkStyle = {
  color: 'rgb(2, 141, 234)',
  textDecoration: 'underline',
  cursor: 'pointer'
}

class ConfirmBooking extends React.Component {

  state = {
    canSubmit: false,
    showEvents: false,
    rulesRead: false,
    showAgreement: false
  }

  constructor(props) {
    super(props)
    this.onValid = ::this.onValid
    this.onInvalid = ::this.onInvalid
    this.onValidSubmit = ::this.onValidSubmit
    this.onSubmitForm = ::this.onSubmitForm
    this.onOpenEvents = ::this.onOpenEvents
    this.onCloseEvents = ::this.onCloseEvents
    this.onCloseAgreement = ::this.onCloseAgreement
    this.onShowAgreement = ::this.onShowAgreement
  }

  onValid() {
    this.setState({canSubmit: true})
  }

  onInvalid() {
    this.setState({canSubmit: false})
  }

  onValidSubmit({organization, activity, userComment}) {
    if (this.props.rules && this.state.rulesRead || !this.props.rules) {
      this.props.onHandleSubmit(organization, activity, userComment)
    }
  }

  onSubmitForm() {
    this.refs.bookingForm.submit()
  }

  onOpenEvents() {
    this.setState({showEvents: true})
  }

  onCloseEvents() {
    this.setState({showEvents: false})
  }

  onCloseAgreement() {
    this.setState({showAgreement: false})
  }

  onShowAgreement() {
    this.setState({showAgreement: true})
  }

  render() {
    const {
      room, recurring, selectedDays,
      rules, termsAndAgreement, pdfDownloadUrl
    } = this.props
    const {user} = this.context
    const {showEvents, showAgreement} = this.state

    return (
      <div>
        {showAgreement && (
          <AgreementOverlay
            onCloseAgreement={this.onCloseAgreement}
            termsAndAgreement={termsAndAgreement}
            pdfDownloadUrl={pdfDownloadUrl}
          />
        )}
        <PageTitle title="Bekreft din booking"/>
        {showEvents
          ? (
            <RecurringEvents
              events={selectedDays}
              recurring={recurring}
              onHandleClose={this.onCloseEvents} />
          )
          : null
        }
        <Formsy.Form
          ref="bookingForm"
          onValid={this.onValid}
          onInvalid={this.onInvalid}
          onValidSubmit={this.onValidSubmit}>
          <GridContainer>
            <UserInfo user={user} room={room}/>
            <BookingTime selectedDays={selectedDays} room={room} onOpenEvents={this.onOpenEvents}/>
            <LocationAndComment room={room} showComment={!!rules}/>
            <RoomInfo room={room}/>
          </GridContainer>
          {rules && (
            <div style={{...centerContainer, marginBottom: 20}}>
              <div>
                <CheckboxWithLink
                  label={(
                    <p style={{margin: 0}}>
                      Jeg har lest og akseptert <ActionLink style={linkStyle} onTouchTap={this.onShowAgreement}>utlånsvilkårene</ActionLink>
                    </p>
                  )}
                  required
                  onCheck={(_, checked) => { this.setState({rulesRead: checked}) }}
                />
              </div>
            </div>
          )}
          <div style={centerContainer}>
            <PaddedButton
              color="#FFF"
              label="Bekreft booking"
              type="submit"
              backgroundColor={theme.submitColor}/>
          </div>
        </Formsy.Form>
        <div style={{...centerContainer, marginTop: 20}}>
          <ActionLink onTouchTap={this.props.onHandleCancel}>
            Avbryt
          </ActionLink>
        </div>
      </div>
    )
  }
}

ConfirmBooking.propTypes = {
  room: React.PropTypes.object.isRequired,
  recurring: React.PropTypes.bool.isRequired,
  selectedDays: React.PropTypes.array.isRequired,
  onHandleSubmit: React.PropTypes.func.isRequired,
  onHandleCancel: React.PropTypes.func.isRequired,
  rules: React.PropTypes.bool,
  termsAndAgreement: React.PropTypes.string,
  pdfDownloadUrl: React.PropTypes.string
}

ConfirmBooking.contextTypes = {
  user: React.PropTypes.object
}

export default ConfirmBooking
