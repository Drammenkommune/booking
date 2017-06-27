export default function(address) {
  return `https://maps.google.com/maps/place/${address.split(' ').join('+')}`
}
