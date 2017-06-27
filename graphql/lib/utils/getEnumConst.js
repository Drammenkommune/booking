import {getEnum} from '~/schema/lookup'

export default function getEnumConst(en, value) {
  return getEnum(en)._values.find(x => x.name === value).value
}
