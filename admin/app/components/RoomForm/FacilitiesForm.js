import React from 'react'
import {FormsyCheckbox} from 'formsy-material-ui'

import {Card, Content} from '@/components'
import {theme} from '@/services'

const checkboxStyle = {
  maxWidth: 200
}

const FacilitiesForm = ({facilities = []}) => {
  // convert array to object, ie ['wifi', 'wheelchair'] => {wifi: true, wheelchair: true}
  const enabledFacilities = facilities.reduce((prev, cur) => {
    prev[cur] = true
    return prev
  }, {})

  return (
    <Card title="Fasiliteter" dividerColor={theme.roomColor} style={{width: '100%'}}>
      <Content style={{display: 'flex', flexWrap: 'wrap'}}>
        <FormsyCheckbox
          style={checkboxStyle}
          name="wheelchair" label="Rullestol-tilgang"
          defaultChecked={enabledFacilities.wheelchair}/>
        <FormsyCheckbox
          style={checkboxStyle}
          name="projectorscreen" label="Projektor/Skjerm"
          defaultChecked={enabledFacilities.projectorscreen}/>
        <FormsyCheckbox
          style={checkboxStyle}
          name="wifi" label="Wifi-internett"
          defaultChecked={enabledFacilities.wifi}/>
        <FormsyCheckbox
          style={checkboxStyle}
          name="speakers" label="Høyttaleranlegg"
          defaultChecked={enabledFacilities.speakers}/>
      </Content>
    </Card>
  )
}

FacilitiesForm.propTypes = {
  facilities: React.PropTypes.array
}

export default FacilitiesForm
