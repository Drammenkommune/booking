import React from 'react'
import {Card, Content, GridContainer} from '@/components'

const profileEditUrl = 'https://brukerprofil.difi.no/minprofil'

const MissingInfo = () => {
  const editLink = `${profileEditUrl}/?goto=${window.location.origin}/auth/login`
  return (
    <GridContainer>
      <div>
        <Card title="Manglende kontaktopplysninger">
          <Content>
            <p>
              For å bruke denne tjenesten må du ha registrert ditt telefonnummer og din epost-adresse hos Difi.
              Dette kan du gjøre <a href={editLink}>på din side hos Difi</a>.
              Når dine kontaktopplysninger er registrert kan du logge inn igjen.
            </p>
            <p>
              Merk at det kan ta noen minutter før endringene trer i kraft hos Difi.
              Om du fortsatt ikke får logget inn etter å ha lagt inn dine kontaktopplysninger kan du prøve igjen etter noen minutter.
            </p>
          </Content>
        </Card>
      </div>
    </GridContainer>
  )
}

export default MissingInfo
