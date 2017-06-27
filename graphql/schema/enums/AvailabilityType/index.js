import {GraphQLEnumType} from 'graphql'

export default new GraphQLEnumType({
  name: 'AvailabilityType',
  values: {
    available: {
      value: 'available'
    },
    busy: {
      value: 'busy'
    },
    closed: {
      value: 'closed'
    }
  }
})
