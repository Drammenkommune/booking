import React from 'react'
import Relay from 'react-relay'

import {PageTitle, GridContainer} from '@/components'
import {theme} from '@/services'
import {mutate} from '~/services'
import UpdateOwnerMutation from './mutations/UpdateOwnerMutation'
import AddressForm from './AddressForm'
import ContactForm from './ContactForm'

class ContactInfo extends React.Component {

  constructor(props) {
    super(props)
    this.handleAddressSubmit = ::this.handleAddressSubmit
    this.handleContactSubmit = ::this.handleContactSubmit
  }

  handleAddressSubmit({address, postalCode, postalArea}) {
    if (address && postalCode && postalArea) {
      const ownerId = this.props.owner.id
      const mutation = new UpdateOwnerMutation({ownerId, address, postalCode, postalArea})
      return mutate(mutation)
    }
    return Promise.reject()
  }

  handleContactSubmit({contactName, contactPhone}) {
    if (contactName && contactPhone) {
      const ownerId = this.props.owner.id
      const mutation = new UpdateOwnerMutation({ownerId, contactName, contactPhone})
      return mutate(mutation)
    }
    return Promise.reject()
  }

  render() {
    const {owner} = this.props

    return (
      <div>
        <PageTitle title="Kontaktinfo" dividerColor={theme.roomColor}/>
        <GridContainer>
          <AddressForm owner={owner} onHandleSubmit={this.handleAddressSubmit}/>
          <ContactForm owner={owner} handleContactSubmit={this.handleContactSubmit}/>
        </GridContainer>
      </div>
    )
  }
}

ContactInfo.propTypes = {
  owner: React.PropTypes.object.isRequired
}

export default Relay.createContainer(ContactInfo, {
  fragments: {
    owner: _ => Relay.QL`
      fragment on Owner {
        id, name,
        address, postalCode, postalArea
        contact {
          name,
          phoneNumber
        }
      }
    `
  }
})
