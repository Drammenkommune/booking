import React from 'react'
import Relay from 'react-relay'
import MediaQuery from 'react-responsive'

import {BigButton, CenterContent, Content, GridContainer} from '@/components'
import AbstractTerms from './AbstractTerms'
import Bookings from './Bookings'
import PreviousRooms from './PreviousRooms'
import Welcome from './Welcome'


const Home = ({user}) => {
  const loggedInToken = localStorage.getItem('dk_public_token') || sessionStorage.getItem('dk_public_token')
  const loggedIn = user.phone && user.email && loggedInToken
  return loggedIn
    ? (
      <div>
        <Content style={{paddingBottom: 0}}>
          <CenterContent>
            <BigButton href="/#/lokale" label="Finn lokale"/>
          </CenterContent>
        </Content>
        <GridContainer>
          <div>
            <Bookings bookings={user.bookings}/>
            <MediaQuery query="(min-width: 760px)">
              <AbstractTerms termsAndAgreement={user.termsAndAgreement}/>
            </MediaQuery>
          </div>
          <div><PreviousRooms rooms={user.previousRooms} /></div>
          <MediaQuery query="(max-width: 759px)">
            <AbstractTerms termsAndAgreement={user.termsAndAgreement}/>
          </MediaQuery>
        </GridContainer>
      </div>
    )
    : (<Welcome />)
}

Home.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default Relay.createContainer(Home, {
  initialVariables: {
    start: new Date().getTime().toString()
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id, name, phone, email,
        termsAndAgreement,
        bookings(start: $start) {
          id,
          recurring,
          events (start: $start) {id, start, end},
          organization,
          userComment,
          room {
            id, name,
            ownerName,
            images { url, thumbnail }
          }
        },
        previousRooms {
          id, name,
          ownerName,
          images { url, thumbnail }
        }
      }
    `
  }
})
