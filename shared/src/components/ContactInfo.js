import React from 'react'
import {css, StyleSheet} from 'aphrodite'

import {BoldText} from '@/components'
import {DrammenLogoWithText} from '@/icons'


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20
  },
  text: {
    lineHeight: '18px',
    margin: 0,
    marginTop: 4
  },
  logo: {
    maxHeight: 55,
    maxWidth: 130,
    flex: 1
  },
  divider: {
    height: 55,
    width: 3,
    margin: '4px 16px 0',
    backgroundColor: '#979797'
  }
})

const ContactInfo = () => {
  return (
    <div className={css(styles.container)}>
      <DrammenLogoWithText className={css(styles.logo)}/>
      <div className={css(styles.divider)}></div>
      <div>
        <BoldText>Kontakt</BoldText>
        <p className={css(styles.text)}>
          Telefon <a href="tel:32040000">320 40 000</a><br />
          Epost <a href="mailto:kommunepost@drmk.no">kommunepost@drmk.no</a>
        </p>
      </div>
    </div>
  )
}

export default ContactInfo
