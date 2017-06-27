const originalInts = {
  å: 229,
  ø: 248,
  æ: 230
}
const newInts = {
  aa: 300,
  å: 299,
  ø: 298,
  æ: 297
}

function getIntArray(string) {
  const intArray = []
  const lowerCaseString = string.toLowerCase()
  for (let i = 0; i < lowerCaseString.length; i++) {
    const substringLength = 2
    if (lowerCaseString.substring(i, substringLength) === 'aa') {
      intArray.push(newInts.aa)
      i++
    } else {
      switch (lowerCaseString.charCodeAt(i)) {
        case originalInts.å: // å
          intArray.push(newInts.å)
          break
        case originalInts.ø: // ø
          intArray.push(newInts.ø)
          break
        case originalInts.æ: // æ
          intArray.push(newInts.æ)
          break
        default:
          intArray.push(lowerCaseString.charCodeAt(i))
          break
      }
    }
  }
  return intArray
}


export default function norwegianAlphabeticalSort(list, key) {
  return list.sort((a, b) => {
    let f
    const d = getIntArray(key ? a[key] : a)
    const e = getIntArray(key ? b[key] : b)
    for (f = 0; f < d.length; f++) {
      if (d[f] !== e[f]) {
        return d[f] - e[f]
      }
    }
    return 0
  })
}
