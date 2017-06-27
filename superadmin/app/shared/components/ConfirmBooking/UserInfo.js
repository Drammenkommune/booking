import React from 'react'
import {Card, Content, InlineText, ValidationInput} from '@/components'
import {theme} from '@/services'

const styles = {
  label: {
    width: '100%',
    paddingTop: 16,
    display: 'block'
  },
  labelText: {
    fontWeight: 'bold', display: 'block'
  }
}

const UserInfo = ({user, room}) => {
  return (
    <Card title="Bestiller" style={{width: '100%'}} dividerColor={theme.bookingColor}>
      <Content>
        <InlineText>Innlogget: {user ? user.name : room.ownerName}</InlineText>
        <label style={styles.label}>
          <span style={styles.labelText}>Hvem skal bruke lokalet?*</span>
          <ValidationInput
            name="organization" required autoFocus
            placeholder="Eksempel: Navnet på laget, foreningen, personen."
            type="text"/>
        </label>
        <label style={styles.label}>
          <span style={styles.labelText}>Hva skal du bruke lokalet til?*</span>
          <ValidationInput
            name="activity" required
            placeholder="Eksempel: trening, øving, årsmøte, styremøte."
            type="text"/>
        </label>
      </Content>
    </Card>
  )
}

UserInfo.propTypes = {
  user: React.PropTypes.object,
  room: React.PropTypes.object.isRequired
}

export default UserInfo
