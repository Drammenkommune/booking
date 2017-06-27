import React from 'react'
import Relay from 'react-relay'
import {withRouter, Route, IndexRoute} from 'react-router'

import * as scenes from './scenes'

import {handleErrorsRenderer, requiresAuth} from '@/services'

const viewer = () => Relay.QL`query { viewer }`
const owner = () => Relay.QL`query { owner }`
const room = () => Relay.QL`query { node(id: $roomId)}`
const booking = () => Relay.QL`query { node(id: $bookingId)}`

const errorRedirects = {
  404: '/admin/#/ikke-funnet'
}

export default (
  <Route path="/" component={scenes.App}>
    <Route
      waypoint
      component={withRouter(requiresAuth(scenes.Admin, 'dk_admin_token', '/admin/#/logg-inn', true))}
      render={handleErrorsRenderer(errorRedirects)}>
      <Route component={scenes.AdminWrapper} queries={{viewer}}>
        <IndexRoute component={scenes.Home} queries={{owner}} />
        <Route path="nytt-lokale" component={scenes.NewRoom} />
        <Route path="lokale/:roomId" waypoint component={scenes.Room} queries={{room}}/>
        <Route path="lokale/:roomId/rediger" component={scenes.UpdateRoom} queries={{room}}/>
        <Route path="lokale/:roomId/book" component={scenes.NewBooking} queries={{room}}/>
        <Route path="booking/:bookingId" waypoint component={scenes.Booking} queries={{booking}}/>
        <Route path="bookinghistorikk" waypoint component={scenes.OldBookings} queries={{owner}}/>
        <Route path="bookinger" waypoint component={scenes.Bookings} queries={{owner}}/>
        <Route path="utilgjengelige" component={scenes.UnavailableDates} queries={{owner}}/>
        <Route path="kontaktinfo" component={scenes.ContactInfo} queries={{owner}}/>
        <Route path="kvittering" component={scenes.Receipt}/>
        <Route path="ikke-funnet" component={scenes.NotFound}/>
      </Route>
    </Route>
    <Route path="logg-inn" component={scenes.Login} queries={{viewer}}/>
  </Route>
)
