import React from 'react'
import PeopleIcon from 'material-ui/svg-icons/social/group'
import {SquareSizeIcon} from '@/icons'

const lineStyle = {display: 'flex', alignItems: 'center', marginTop: 0, height: 24}

const RoomInfo = ({size, maxPeople}) => {
  return (
    <div style={{width: '50%'}}>
      <p style={lineStyle}>
        <PeopleIcon style={{marginRight: 10}} />
        {maxPeople} pers.
      </p>
      {size
        ? (
          <p style={lineStyle}>
            <SquareSizeIcon style={{marginRight: 10, height: 24, width: 24}} />
            {size} kvm.
          </p>
        )
        : (<p style={lineStyle}></p>)
      }
    </div>
  )
}

RoomInfo.propTypes = {
  size: React.PropTypes.number,
  maxPeople: React.PropTypes.number
}

export default RoomInfo
