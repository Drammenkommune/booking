import React from 'react'

import Hour from './Hour'

const hourStyle = {display: 'flex', alignItems: 'center'}

const paragraphStyle = {marginBottom: 5}

const HourLegend = () => {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <div style={hourStyle}>
        <Hour busy={true}/>
        <p style={paragraphStyle}>Opptatt</p>
      </div>
      <div style={hourStyle}>
        <Hour />
        <p style={paragraphStyle}>Ledig</p>
      </div>
      <div style={hourStyle}>
        <Hour unavailable={true}/>
        <p style={paragraphStyle}>Utilgjengelig</p>
      </div>
    </div>
  )
}

export default HourLegend
