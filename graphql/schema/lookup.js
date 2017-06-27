export function getInterface(name) {
  return require(`./interfaces/${name}`).default
}

export function getType(name) {
  return require(`./types/${name}`).default
}

export function getEnum(name) {
  return require(`./enums/${name}`).default
}

export function getInputType(name) {
  return require(`./inputTypes/${name}`).default
}
