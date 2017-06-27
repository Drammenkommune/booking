import React from 'react'
import {ListItem, IconButton} from 'material-ui'
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right'

import {ListDivider} from '@/components'
import {Title, Subtitle} from '@/components/ListItem'
import {theme} from '@/services'

const Owner = ({owner}) => (
  <div>
    <ListItem
      href={`/superadmin/#/utleier/${owner.id}`}
      primaryText={<Title title={owner.name} />}
      secondaryText={(
        <Subtitle
          title={`${owner.address}, ${owner.postalCode} ${owner.postalArea}`}
          style={{height: 18}}
        />
      )}
      rightIconButton={
        <IconButton aria-label="Gå til booking">
          <RightIcon/>
        </IconButton>
      }
    />
    <ListDivider color={theme.roomColor}/>
  </div>
)

Owner.propTypes = {
  owner: React.PropTypes.object.isRequired
}

export default Owner
