import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import {IconButton} from 'material-ui'
import CloseIcon from 'material-ui/svg-icons/content/clear'

import {Agreement, Card, Overlay} from '@/components'

const styles = StyleSheet.create({
  container: {
    maxHeight: 'calc(100% - 40px)',
    maxWidth: 500,
    margin: 0,
    padding: 16,
    overflowY: 'scroll',
    '@media (max-width: 480px)': {
      borderRadius: 0,
      position: 'absolute',
      maxWidth: '100%',
      maxHeight: '100%',
      height: '100%',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0
    }
  },
})

const AgreementOverlay = ({onCloseAgreement, termsAndAgreement, pdfDownloadUrl}) => {
  const onKeyPress = (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      onCloseAgreement(ev)
    }
  }
  return (
    <Overlay onHandleClick={onCloseAgreement}>
      <Card
        title="Vilkår for leie"
        className={css(styles.container)}
        action={(
          <IconButton
            aria-label="Lukk vilkår"
            onKeyPress={onKeyPress}
            onTouchTap={onCloseAgreement}>
            <CloseIcon />
          </IconButton>
        )}>
        <Agreement
          hideTitle={true}
          termsAndAgreement={termsAndAgreement}
          pdfDownloadUrl={pdfDownloadUrl}
        />
      </Card>
    </Overlay>
  )
}

AgreementOverlay.propTypes = {
  onCloseAgreement: React.PropTypes.func.isRequired,
  termsAndAgreement: React.PropTypes.string.isRequired,
  pdfDownloadUrl: React.PropTypes.string
}

export default AgreementOverlay
