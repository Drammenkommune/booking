import {GraphQLEnumType} from 'graphql'

export default new GraphQLEnumType({
  name: 'FacilityType',
  values: {
    wifi: {
      value: 'wifi'
    },
    wheelchair: {
      value: 'wheelchair'
    },
    projectorscreen: {
      value: 'projectorscreen'
    },
    speakers: {
      value: 'speakers'
    }
  }
})
