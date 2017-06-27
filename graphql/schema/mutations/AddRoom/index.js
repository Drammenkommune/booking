import {GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType, getEnum, getInputType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'AddRoom',

  inputFields: {
    name: {type: new GraphQLNonNull(GraphQLString)},
    type: {type: new GraphQLNonNull(getEnum('RoomType'))},
    maxPeople: {type: new GraphQLNonNull(GraphQLInt)},
    size: {type: GraphQLInt},
    facilities: {type: new GraphQLList(getEnum('FacilityType'))},
    images: {type: new GraphQLList(getInputType('Image'))},
    info: {type: GraphQLString}
  },

  outputFields: {
    room: {
      type: getType('Room'),
      resolve: ({room}) => room
    },
    owner: {
      type: getType('Owner'),
      resolve: ({owner}) => owner
    }
  },

  mutateAndGetPayload: mutate
})
