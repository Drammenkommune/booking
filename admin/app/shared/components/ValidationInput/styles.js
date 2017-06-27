import {StyleSheet} from 'aphrodite'
import theme from '@/services/theme'

export default StyleSheet.create({
  container: {width: '100%'},
  input: {
    width: '100%',
    height: 29,
    fontSize: 18,
    padding: '0 18px',
    marginTop: 16,
    border: 'solid 2px #455a64',
    borderRadius: '4px',
  },
  textarea: {
    minHeight: 300,
    height: 'auto',
    resize: 'none',
    padding: '4px 18px'
  },
  errorInput: {
    borderColor: theme.errorColor
  },
  errorText: {
    fontSize: 14,
    lineHeight: '14px',
    color: theme.errorColor,
    marginTop: 5,
    paddingLeft: 16,
    display: 'block'
  },
  disabled: {
    cursor: 'not-allowed',
    backgroundColor: '#ddd'
  }
})
