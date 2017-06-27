import React from 'react'

import WaypointContext from './WaypointContext'

export function previousLocation() {
  const storage = window.sessionStorage.getItem('waypoints')
  const waypoints = storage ? storage.split(',') : []

  if (waypoints.length) {
    return waypoints[waypoints.length - 1] === window.location.hash.split('#')[1]
      ? waypoints[waypoints.length - 2]
      : waypoints[waypoints.length - 1]
  }

  return null
}

export default function useWaypoint(baseLocation) {
  return {
    renderRouterContext: (child, props) => (
      <WaypointContext routerProps={props} baseLocation={baseLocation}>
        {child}
      </WaypointContext>
    )
  }
}
