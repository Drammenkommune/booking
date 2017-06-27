import React from 'react'

import { Content } from '@/components'
import { facilityEnum } from '@/services'

const RoomFacilities = ({ facilities }) => {
  return facilities.length
    ? <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
      {facilities.map(facility => {
        const Icon = facilityEnum.icons[facility]
        return (
          <span key={facility} title={facilityEnum[facility]}>
            <Icon style={{ marginRight: 16 }} />
          </span>
        )
      })}
    </Content>
    : <Content><h4 style={{ height: 24 }}>Ingen fasiliteter</h4></Content>
}

RoomFacilities.propTypes = {
  facilities: React.PropTypes.array
}

export default RoomFacilities
