import React from 'react'
import PeopleIcon from 'material-ui/svg-icons/social/group'

import SquareSizeIcon from '@/icons/SquareSizeIcon'
import Content from '@/components/Content'
import facilityEnum from '@/services/facilityEnum'

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between'
}
const facilityStyle = {
  minWidth: 130,
  width: '50%',
  display: 'flex',
  alignItems: 'center',
  margin: 0, marginBottom: 8
}
const iconStyle = {marginRight: 7, height: 24, width: 24}

const RoomFacilities = ({facilities, maxPeople, size}) => {
  return (
    <Content style={containerStyle}>
      {facilities.map((facility, index) => {
        const Icon = facilityEnum.icons[facility]
        return (
          <p key={index} title={facilityEnum[facility]} style={facilityStyle}>
            <Icon style={iconStyle}/>
            {facilityEnum[facility]}
          </p>
        )
      })}
      <p title="Personer" style={facilityStyle}>
        <PeopleIcon style={iconStyle}/>
        {maxPeople} personer
      </p>
      {size
        ? <p title="Kvadratmeter" style={facilityStyle}>
          <SquareSizeIcon style={iconStyle}/>
          {size} kvm.
        </p>
        : null
      }
    </Content>
  )
}

RoomFacilities.propTypes = {
  facilities: React.PropTypes.array,
  maxPeople: React.PropTypes.number,
  size: React.PropTypes.number
}

export default RoomFacilities
