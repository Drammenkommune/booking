import {GraphQLEnumType} from 'graphql'

export default new GraphQLEnumType({
  name: 'RoomType',
  values: {
    classroom: {
      value: 'classroom'
    },
    meetingroom: {
      value: 'meetingroom'
    },
    cafeteria: {
      value: 'cafeteria'
    },
    gymhall: {
      value: 'gymhall'
    }
  }
})
