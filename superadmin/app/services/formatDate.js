import moment from 'moment'
import 'moment/locale/nb'

export default (date, format = 'DD.MM.YYYY HH:mm') => {
  return moment(new Date(date)).format(format)
}
