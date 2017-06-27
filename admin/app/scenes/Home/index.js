import React from 'react'
import Relay from 'react-relay'
import WarningIcon from 'material-ui/svg-icons/alert/warning'

import Rooms from './Rooms'
import Bookings from './Bookings'
import {BigButton, GridContainer} from '@/components'
const styles = {
  warningIcon: {color: 'white', marginRight: 16, marginBottom: -8},
  centerText: {textAlign: 'center'},
  disabled: {
    opacity: 0.54,
    cursor: 'not-allowed'
  }
}

class Home extends React.Component {
  render() {
    const {owner} = this.props
    const contact = owner.contact
    const noContact = !contact.name || !contact.phoneNumber
    return (
      <div>
        {noContact && (
          <GridContainer>
            <div>
              <h2 style={styles.centerText}>Velkommen til Drammen booking </h2>
              <p style={styles.centerText}>
                Før noen kan booke lokaler på din skole,
                må du registrere skolens kontaktperson.
                Du kan endre dette i etterkant under menyvalget "Kontaktinfo"
              </p>
              <BigButton
                href="/admin/#/kontaktinfo"
                label={(
                  <span>
                    <WarningIcon style={styles.warningIcon}/>
                    Registrer kontaktperson
                  </span>
                )}/>
            </div>
          </GridContainer>
        )}
        <div style={noContact ? styles.disabled : null}>
          <GridContainer>
            <div>
              <Rooms owner={owner} disabled={noContact}/>
            </div>
            <div>
              <Bookings owner={owner} disabled={noContact}/>
            </div>
          </GridContainer>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  owner: React.PropTypes.object
}

export default Relay.createContainer(Home, {
  fragments: {
    owner: _ => Relay.QL`
      fragment on Owner {
        contact {
          name, phoneNumber
        }
        ${Rooms.getFragment('owner')}
        ${Bookings.getFragment('owner')}
      },
    `,
  },
})
