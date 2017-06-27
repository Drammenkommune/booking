import React from 'react'
import 'core-js/fn/array/find'
import 'core-js/fn/array/find-index'

const KEY_QUERY = '?_k='

const isWaypoint = (routes) => {
  // Slice to copy array and then reverse the copy, and not the original
  const route = routes.slice().reverse().find(route => route.path)
  return route.waypoint ? route : null
}

const waypointKey = ({pathname, key}) => (
  `${pathname}${KEY_QUERY}${key}`
)

class WaypointContext extends React.Component {

  get waypoints() {
    const waypoints = window.sessionStorage.getItem('waypoints')
    return waypoints ? waypoints.split(',') : []
  }

  componentWillMount() {
    if (isWaypoint(this.props.routerProps.routes)) {
      this.removeWaypointIfPresent(this.props.routerProps)
    }
  }

  componentWillUnmount() {
    if (isWaypoint(this.props.routerProps.routes)) {
      this.registerWayPoint(this.props.routerProps)
    }
  }

  registerWayPoint({location}) {
    const waypoints = this.waypoints
    const currentWaypoint = waypointKey(location)

    waypoints.push(currentWaypoint)
    window.sessionStorage.setItem('waypoints', waypoints.join(','))
  }

  removeWaypointIfPresent({location}) {
    const waypoints = this.waypoints
    const currentIndex = waypoints.findIndex(
      waypoint => waypoint.split(KEY_QUERY)[0] === location.pathname
    )

    if (currentIndex >= 0) {
      const newWaypoints = waypoints.slice(0, currentIndex)

      window.sessionStorage.setItem('waypoints', newWaypoints.join(','))
    }
  }

  componentWillReceiveProps({routerProps}) {
    if (this.props.routerProps.location === routerProps.location) { return }

    // This means we are leaving a waypoint, and should save it in sessionStorage
    if (isWaypoint(this.props.routerProps.routes)) {
      this.registerWayPoint(this.props.routerProps)
    }

    // Check if the new waypoint has been visited and save, and should be removed
    if (isWaypoint(routerProps.routes)) {
      this.removeWaypointIfPresent(routerProps)
    }

    // If we are navigating to the base location, all waypoints can be removed
    if (routerProps.location.pathname === this.props.baseLocation) {
      window.sessionStorage.setItem('waypoints', '')
    }
  }

  render() {
    return this.props.children
  }
}

WaypointContext.propTypes = {
  children: React.PropTypes.element.isRequired,
  routerProps: React.PropTypes.object.isRequired,
  baseLocation: React.PropTypes.string.isRequired
}

export default WaypointContext
