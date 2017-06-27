/* eslint-disable no-magic-numbers */
import * as Colors from 'material-ui/styles/colors'
import {fade} from 'material-ui/utils/colorManipulator'
import Spacing from 'material-ui/styles/spacing'
import zIndex from 'material-ui/styles/zIndex'

const fontFamily = 'futura-pt, sans-serif'

export default {
  zIndex,
  spacing: Spacing,
  fontFamily,
  palette: {
    primary1Color: '#2c3e50',
    accent1Color: '#c80000',
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: fade(Colors.darkBlack, '0.3'),
    pickerHeaderColor: Colors.cyan500
  },
  appBar: {
    titleFontWeight: 'bold'
  }
}
