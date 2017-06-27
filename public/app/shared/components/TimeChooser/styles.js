import {StyleSheet} from 'aphrodite'
import {theme} from '@/services'

export default StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 500,
    height: '100%',
    maxHeight: 735,
    backgroundColor: theme.backgroundColor,
    borderRadius: 4,
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    margin: 'auto',
    padding: 16,
    '@media (max-width: 480px)': {
      maxHeight: '100%',
      borderRadius: 0,
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      transform: 'none'
    }
  },
  header: {
    flexGrow: 0
  },
  timeTable: {
    flexGrow: 1,
    width: 'calc(100% + 32px)',
    maxHeight: 375,
    height: '100%',
    margin: '12px -16px',
    paddingBottom: 16,
    backgroundColor: 'white',
    overflowY: 'scroll',
    '-ms-overflow-style': '-ms-autohiding-scrollbar',
    boxShadow: 'inset 0 60px 60px -70px rgba(0, 0, 0, 0.55), inset 0 -60px 60px -70px rgba(0, 0, 0, 0.55)',
  },
  footer: {
    flexGrow: 0
  }
})
