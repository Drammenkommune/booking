import React from 'react'
import Relay from 'react-relay'
import {Router, hashHistory, applyRouterMiddleware} from 'react-router'
import useRelay from 'react-router-relay'
import routes from '~/routes'
import {useScroll} from 'react-router-scroll'
import {useWaypoint} from '@/services'

export default class Root extends React.Component {
  render() {
    return <Router
      history={hashHistory}
      routes={routes}
      environment={Relay.Store}
      forceFetch={true}
      render={applyRouterMiddleware(useScroll(), useRelay, useWaypoint('/'))}
    />
  }
}
