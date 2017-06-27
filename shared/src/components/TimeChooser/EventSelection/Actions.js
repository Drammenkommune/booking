import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import MediaQuery from 'react-responsive'
import {ActionLink, CenterContent, PaddedButton} from '@/components'
import {theme} from '@/services'

const styles = StyleSheet.create({
  container: {
    padding: '20px 0',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  button: {
    '@media (max-width: 480px)': {
      width: '100%',
      margin: '10px 0'
    }
  }
})

const Actions = ({onAdvanceClick, onBackClick, onHandleClose}) => {
  return (
    <div>
      <MediaQuery query="(max-width: 480px)">
        <div className={css(styles.container)}>
          <PaddedButton
            label="Gå videre"
            className={css(styles.button)}
            onTouchTap={onAdvanceClick}
            backgroundColor={theme.bookingColor}/>
          <PaddedButton
            label="Tilbake"
            className={css(styles.button)}
            onTouchTap={onBackClick}
            backgroundColor="#B4B4B4"/>
        </div>
      </MediaQuery>
      <MediaQuery query="(min-width: 480px)">
        <div className={css(styles.container)}>
          <PaddedButton
            label="Tilbake"
            className={css(styles.button)}
            onTouchTap={onBackClick}
            backgroundColor="#B4B4B4"/>
          <PaddedButton
            label="Gå videre"
            className={css(styles.button)}
            onTouchTap={onAdvanceClick}
            backgroundColor={theme.bookingColor}/>
        </div>
      </MediaQuery>
      <CenterContent>
        <div style={{marginTop: 16}}>
          <ActionLink
            onTouchTap={onHandleClose}>
            Avbryt
          </ActionLink>
        </div>
      </CenterContent>
    </div>
  )
}

Actions.propTypes = {
  onAdvanceClick: React.PropTypes.func.isRequired,
  onBackClick: React.PropTypes.func.isRequired,
  onHandleClose: React.PropTypes.func.isRequired
}

export default Actions
