import React from 'react'
import Relay from 'react-relay'
import {withRouter, Route, IndexRoute} from 'react-router'
import {handleErrorsRenderer} from '@/services'
import * as scenes from './scenes'

const user = () => Relay.QL`query { user }`
const room = () => Relay.QL`query { node(id: $id) }`
const booking = room
const searchResult = () => Relay.QL`query { search }`

const errorRedirects = {
  404: '/#/ikke-funnet'
}

export default (
  <Route
    path="/" waypoint component={withRouter(scenes.App)} queries={{user}}
    render={handleErrorsRenderer(errorRedirects)}>
    <IndexRoute component={scenes.Home} queries={{user}}/>
    <Route path="lokale" waypoint component={scenes.Rooms} queries={{searchResult}}/>
    <Route path="lokale/:id" waypoint component={scenes.Room} queries={{room}}/>
    <Route path="lokale/:id/book" component={scenes.Book} queries={{room, user}}/>
    <Route path="logg-inn" component={scenes.Login}/>
    <Route path="booking/:id" waypoint component={scenes.Booking} queries={{booking}}/>
    <Route path="bookinghistorikk" waypoint component={scenes.OldBookings} queries={{user}}/>
    <Route path="kvittering" component={scenes.Receipt}/>
    <Route path="om-tjenesten" component={scenes.About} queries={{user}}/>
    <Route path="vilkar" component={scenes.Terms} queries={{user}}/>
    <Route path="profil" component={scenes.Profile} queries={{user}}/>
    <Route path="ikke-funnet" component={scenes.NotFound}/>
    <Route path="manglende-info" component={scenes.MissingInfo}/>
    <Route path="authenticated" component={scenes.Authenticated}/>
  </Route>
)
