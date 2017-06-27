import React from 'react'
import Relay from 'react-relay'
import {css, StyleSheet} from 'aphrodite'

import {GridContainer, PageTitle, InlineText} from '@/components'
import {requiresAuth} from '@/services'

const textRow = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: 5
}

const profileEditUrl = 'https://brukerprofil.difi.no/minprofil'

const Profile = ({user}) => {
  const editLink = {
    href: `${profileEditUrl}?goto=${window.location.href}`,
    className: css(StyleSheet.create({link: {fontSize: 'inherit'}}).link)
  }

  return (
    <div>
      <PageTitle title="Din profil" dividerColor="rgba(0, 0, 0, 0.12)"/>
      <GridContainer>
        <div>
          <div style={textRow}>
            <h4>Navn: </h4><InlineText>&nbsp;{user.name}</InlineText>
          </div>
          <div style={textRow}>
            <h4>E-post: </h4><InlineText>&nbsp;{user.email}</InlineText>
          </div>
          <div style={textRow}>
            <h4>Tlf. nr: </h4><InlineText>&nbsp;{user.phone}</InlineText>
          </div>
          <p>
            Dine kontaktopplysninger kan endres i <a {...editLink}>din brukerprofil hos Difi</a>.
            Kontaktopplysningene dine vil bli oppdatert her ved neste pålogging.
          </p>
        </div>
      </GridContainer>
    </div>
  )
}

Profile.propTypes = {
  user: React.PropTypes.object
}

export default Relay.createContainer(requiresAuth(Profile, 'dk_public_token', '/#/logg-inn', true), {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id, name, email, phone
      }
    `
  }
})
