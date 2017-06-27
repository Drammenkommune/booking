import React from 'react'

import {Card, Content, ValidationInput} from '@/components'
import {theme} from '@/services'

const textareaPlaceholder = `Eksempel:
Husk
Nøkler må hentes på skolens kontor innen kl. 14:00 samme dag.
Ingen dyr.
Fjernkontroll ligger i skuffen til høyre.

Innsjekking
Skru av alarm
Skru på hovedbryter

Utsjekking
Skru av alt utstyr og hovedbryter
`

const ImportantInfoForm = ({info}) => {
  return (
    <Card title="Viktig informasjon" dividerColor={theme.roomColor} style={{width: '100%'}}>
      <Content>
        <ValidationInput
          name="info"
          style={{marginTop: 0}}
          placeholder={textareaPlaceholder}
          defaultValue={info}
          multiLine={true}/>
      </Content>
    </Card>
  )
}

ImportantInfoForm.propTypes = {
  info: React.PropTypes.string
}

export default ImportantInfoForm
