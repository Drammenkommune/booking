import areIntlLocalesSupported from 'intl-locales-supported'
import IntlPolyfill from 'intl'

const DateTimeFormat = areIntlLocalesSupported(['nb'])
  ? global.Intl.DateTimeFormat
  : IntlPolyfill.DateTimeFormat

export default DateTimeFormat
