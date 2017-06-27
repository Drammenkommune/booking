function setReceiptType(type) {
  localStorage.setItem('action_receipt', type)
}

function getReceiptType() {
  return localStorage.getItem('action_receipt')
}

function setReceiptConfig(title, subtitle, color, bookingId) {
  localStorage.setItem('dk_receipt_title', title)
  localStorage.setItem('dk_receipt_subtitle', subtitle)
  localStorage.setItem('dk_receipt_dividercolor', color)
  localStorage.setItem('dk_receipt_bookingid', bookingId)
}

function getReceiptConfig() {
  return {
    title: localStorage.getItem('dk_receipt_title'),
    subtitle: localStorage.getItem('dk_receipt_subtitle'),
    dividerColor: localStorage.getItem('dk_receipt_dividercolor'),
    bookingId: localStorage.getItem('dk_receipt_bookingid')
  }
}

function removeReceiptType() {
  localStorage.removeItem('action_receipt')
}

export default {
  getType: getReceiptType,
  setType: setReceiptType,
  setConfig: setReceiptConfig,
  getConfig: getReceiptConfig,
  removeType: removeReceiptType
}
