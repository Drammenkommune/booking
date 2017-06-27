import {GraphQLString, GraphQLInt, GraphQLList, GraphQLID} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType, getEnum, getInputType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'UpdateRoom',

  inputFields: {
    roomId: {type: GraphQLID},
    name: {type: GraphQLString},
    type: {type: getEnum('RoomType')},
    maxPeople: {type: GraphQLInt},
    size: {type: GraphQLInt},
    facilities: {type: new GraphQLList(getEnum('FacilityType'))},
    images: {type: new GraphQLList(getInputType('Image'))},
    info: {type: GraphQLString}
  },

  outputFields: {
    room: {
      type: getType('Room'),
      resolve: room => room
    }
  },

  mutateAndGetPayload: mutate
})
