const fontFamily = 'Droid sans, sans-serif'
const fontConfig = (fontSize, fontWeight = 'regular') => {
  return {
    fontFamily,
    fontSize,
    fontWeight
  }
}

export default {
  backgroundColor: '#EEEEEE',
  bookingColor: '#7EDDD6',
  roomColor: '#FABA2D',
  errorColor: '#C80000',
  submitColor: '#6086AC',
  linkColor: '#028DEA',
  timeChooser: {
    open: '#50e3c2',
    busy: '#c80000',
    unavailable: '#010101'
  }
}
