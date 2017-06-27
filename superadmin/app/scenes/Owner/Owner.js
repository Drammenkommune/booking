import React from 'react'
import Relay from 'react-relay'
import EditIcon from 'material-ui/svg-icons/image/edit'

import {Card, CardActionButton, Content} from '@/components'
import {theme} from '@/services'

const Owner = ({owner}, {router}) => {
  const infos = [{
    title: 'Adresse',
    value: (
      <p>
        {owner.address}, {owner.postalCode} {owner.postalArea}
      </p>
    ),
    order: 0
  }, {
    title: 'Brukernavn',
    value: <p>{owner.email}</p>,
    order: 1
  }]

  function edit() {
    router.push(`/utleier/${owner.id}/rediger`)
  }

  return (
    <Card
      title={owner.name}
      color={theme.roomColor}
      action={(
        <CardActionButton onTouchTap={edit} icon={<EditIcon />} label="Rediger" />
      )}>
      <Content>
        {infos.filter(info => info.value).map(info => (
          <div key={info.order}>
            <h3>{info.title}</h3>
            {info.value}
          </div>
        ))}
      </Content>
    </Card>
  )
}

Owner.propTypes = {
  owner: React.PropTypes.object.isRequired
}

Owner.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Relay.createContainer(Owner, {
  fragments: {
    owner: _ => Relay.QL`
      fragment on Owner {
        id, name, address,
        postalCode, postalArea,
        email
      }
    `
  }
})
