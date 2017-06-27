import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import {FormsyRadioGroup, FormsyRadio} from 'formsy-material-ui'

import {Card, Content, ValidationInput} from '@/components'
import {theme} from '@/services'

const styles = StyleSheet.create({
  radioContainer: {display: 'flex', flexWrap: 'wrap'},
  radio: {width: '50%', marginBottom: 20 },
  labelContainer: {display: 'flex', alignItems: 'flex-end', marginBottom: 16, paddingTop: 16},
  lastLabelContainer: {marginBottom: 0},
  inlineLabel: {width: '50%'},
  label: {width: '100%'},
  labelText: {fontSize: 18, fontWeight: 'bold', display: 'block'}
})

const AboutRoomForm = ({type, name, size, maxPeople}) => {
  return (
    <Card title="Om lokalet" dividerColor={theme.roomColor}>
      <Content>
        <FormsyRadioGroup
          name="type"
          defaultSelected={type}
          required
          className={css(styles.radioContainer)}
        >
          <FormsyRadio
            required
            className={css(styles.radio)}
            value="meetingroom"
            label="Møterom"
          />
          <FormsyRadio
            required
            className={css(styles.radio)}
            value="cafeteria"
            label="Kafeteria"
          />
          <FormsyRadio
            required
            className={css(styles.radio)}
            value="classroom"
            label="Klasserom"
          />
          <FormsyRadio
            required
            className={css(styles.radio)}
            value="gymhall"
            label="Gymsal"
          />
        </FormsyRadioGroup>
        <div className={css(styles.labelContainer)}>
          <label className={css(styles.label)}>
            <span className={css(styles.labelText)}>Navn på lokalet</span>
            <ValidationInput
              style={{marginTop: 16}}
              name="name" required
              placeholder="Navn"
              defaultValue={name}
              type="text"/>
          </label>
        </div>
        <div className={css(styles.labelContainer)}>
          <label style={{paddingRight: 8}} className={css(styles.inlineLabel)}>
            <span className={css(styles.labelText)}>Antall personer</span>
            <ValidationInput
              style={{maxWidth: 120, width: '100%'}}
              name="maxPeople" required
              placeholder="Antall"
              defaultValue={maxPeople}
              type="number"/>
          </label>
          <label style={{paddingLeft: 8}} className={css(styles.inlineLabel)}>
            <span className={css(styles.labelText)}>
              Kvadratmeter
            </span>
            <ValidationInput
              style={{maxWidth: 120, width: '100%'}}
              name="size"
              placeholder="Kvm"
              defaultValue={size}
              type="number"/>
          </label>
        </div>
      </Content>
    </Card>
  )
}

AboutRoomForm.propTypes = {
  type: React.PropTypes.string,
  name: React.PropTypes.string,
  maxPeople: React.PropTypes.number,
  size: React.PropTypes.number,
  contact: React.PropTypes.object,
}

export default AboutRoomForm
