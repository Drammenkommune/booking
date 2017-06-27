import React from 'react'
import Relay from 'react-relay'
import {withRouter, Route, IndexRoute} from 'react-router'

import * as scenes from './scenes'

import {handleErrorsRenderer, requiresAuth} from '@/services'

const admin = () => Relay.QL`query { admin }`
const node = () => Relay.QL`query { node(id: $id) }`

const errorRedirects = {
  404: 'superadmin/#/ikke-funnet'
}

export default (
  <Route path="/" component={scenes.App}>
    <Route
      waypoint
      component={withRouter(requiresAuth(scenes.Admin, 'dk_superadmin_token', '/superadmin/#/logg-inn', true))}
      render={handleErrorsRenderer(errorRedirects)}>
      <Route component={scenes.AdminWrapper} queries={{admin}}>
        <IndexRoute component={scenes.Home} queries={{admin}} />
        <Route path="/bookingstidsperiode" component={scenes.BookingPeriod} queries={{admin}}/>
        <Route path="/vilkar" component={scenes.Terms} queries={{admin}}/>
        <Route path="/om-tjenesten" component={scenes.About} queries={{admin}}/>
        <Route path="/statistikk" component={scenes.Statistics} queries={{admin}}/>
        <Route path="/utleier/ny" component={scenes.NewOwner} />
        <Route path="/utleier/:id" component={scenes.Owner} queries={{node}} />
        <Route path="/utleier/:id/rediger" component={scenes.EditOwner} queries={{node}} />
      </Route>
    </Route>
    <Route path="/logg-inn" component={scenes.Login} queries={{admin}}/>
  </Route>
)
