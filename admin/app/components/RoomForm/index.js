import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import MediaQuery from 'react-responsive'
import Formsy from 'formsy-react'

import {mutate} from '~/services'
import {GridContainer, Content, PaddedButton} from '@/components'
import {theme} from '@/services'
import RemoveRoomMutation from './mutations/RemoveRoomMutation'
import AboutRoomForm from './AboutRoomForm'
import FacilitiesForm from './FacilitiesForm'
import ImportantInfoForm from './ImportantInfoForm'
import ImagesForm from './ImagesForm'

const stretch = {alignItems: 'stretch', display: 'flex'}

const styles = StyleSheet.create({
  leftButton: {
    paddingRight: 10,
    width: 'calc(50% - 10px)',
    display: 'flex',
    justifyContent: 'flex-end',
    '@media (max-width: 760px)': {
      width: 'calc(50% - 8px)',
    },
    '@media (max-width: 550px)': {
      width: 'calc(100% - 16px)',
      justifyContent: 'center',
      padding: 0
    },
    '@media (min-width: 1100px)': {
      paddingRight: 20
    }
  },
  rightButton: {
    paddingLeft: 10,
    width: 'calc(50% - 10px)',
    '@media (max-width: 760px)': {
      width: 'calc(50% - 8px)',
    },
    '@media (max-width: 550px)': {
      width: 'calc(100% - 16px)',
      display: 'flex',
      justifyContent: 'center',
      padding: 0,
      paddingTop: 10
    },
    '@media (min-width: 1100px)': {
      paddingLeft: 20
    }
  }
})

class RoomForm extends React.Component {

  constructor(props) {
    super(props)
    this.onValidSubmit = ::this.onValidSubmit
    this.deleteRoom = ::this.deleteRoom
    this.state = {
      images: this.props.room ? this.props.room.images : []
    }
  }

  getFacilities(facilities) {
    return Object.values(facilities)
      .map((facility, index) => {
        return {name: Object.keys(facilities)[index], selected: facility}
      })
      .filter(facility => {
        return facility.selected
      })
      .map(facility => facility.name)
  }

  onValidSubmit(values) {
    const {
      name, type, maxPeople,
      size, info, wheelchair,
      projectorscreen, wifi, speakers
    } = values
    const images = this.state.images.map(({url, thumbnail}) => ({url, thumbnail}))
    const facilities = this.getFacilities({wheelchair, projectorscreen, wifi, speakers})
    const mutation = new this.props.onSubmitMutation({
      name, type, maxPeople, size,
      info, facilities, images,
      roomId: this.props.room ? this.props.room.id : null
    })
    mutate(mutation)
      .then(this.props.onSubmitSuccess)
  }

  deleteRoom(event) {
    event.preventDefault()
    const bookingEvents = this.props.room.bookings.length > 0
      ? this.props.room.bookings
          .map(({events}) => events)
          .reduce((a, b) => a.concat(b))
      : []
    if (bookingEvents.length > 0) {
      window.alert('Du må kansellere alle fremtidige bookinger på dette lokalet før du kan slette det')
    } else if (window.confirm('Er du sikker på at du vil slette lokalet?')) {
      const mutation = new RemoveRoomMutation({id: this.props.room.id, ownerId: this.props.room.owner.id})

      mutate(mutation)
        .then(this.props.onDeleteSuccess)
    }
  }

  render() {
    const {facilities, type, name, maxPeople, size, contact, info} = this.props.room || {}

    return (
      <Content>
        <Formsy.Form
          ref="roomForm"
          onValid={this.onValid}
          onInvalid={this.onInvalid}
          onValidSubmit={this.onValidSubmit}>
          <GridContainer>
            <div>
              <AboutRoomForm
                type={type} name={name} size={size}
                maxPeople={maxPeople} contact={contact}/>
            </div>
            <div style={stretch}>
              <MediaQuery query="(min-width: 760px)">
                <ImportantInfoForm info={info}/>
              </MediaQuery>
              <MediaQuery query="(max-width: 760px)">
                <FacilitiesForm facilities={facilities}/>
              </MediaQuery>
            </div>
            <div style={stretch}>
              <MediaQuery query="(min-width: 760px)">
                <FacilitiesForm facilities={facilities}/>
              </MediaQuery>
              <MediaQuery query="(max-width: 760px)">
                <ImportantInfoForm info={info}/>
              </MediaQuery>
            </div>
            <div style={stretch}>
              <ImagesForm images={this.state.images}
                onImageSelect={(url, thumbnail) => {
                  const images = this.state.images
                  images.push({url, thumbnail})
                  this.setState(images)
                }}
                onImageRemove={(url) => {
                  const images = this.state.images.filter(image => image.url !== url)
                  this.setState({images})
                }}
              />
            </div>
          </GridContainer>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: 20
          }}>
            {this.props.room && (
              <div className={css(styles.leftButton)}>
                <PaddedButton
                  backgroundColor={theme.errorColor}
                  onTouchTap={this.deleteRoom}
                  color="#FFF"
                  label="Slett lokalet"/>
              </div>
            )}
            <div className={css(this.props.room ? styles.rightButton : null)}>
              <PaddedButton
                type="submit"
                backgroundColor={theme.roomColor}
                onTouchTap={this.onSubmit}
                label={this.props.submitLabel} />
            </div>
          </div>
        </Formsy.Form>
      </Content>
    )
  }
}

RoomForm.propTypes = {
  room: React.PropTypes.object,
  onSubmitMutation: React.PropTypes.func.isRequired,
  onSubmitSuccess: React.PropTypes.func.isRequired,
  onDeleteSuccess: React.PropTypes.func,
  submitLabel: React.PropTypes.string.isRequired,
}

export default RoomForm
