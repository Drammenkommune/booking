import {theme} from '@/services'

export default {
  form: {display: 'flex', flexWrap: 'wrap'},
  fullWidth: {width: '100%', marginBottom: 10},
  zipCode: {width: 130, marginRight: 10},
  fill: {flex: 1},
  input: {marginTop: 8},
  error: {
    fontSize: 14,
    lineHeight: '18px',
    display: 'block',
    marginTop: 6,
    color: theme.errorColor
  }
}
