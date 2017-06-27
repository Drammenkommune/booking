import {GraphQLNonNull, GraphQLID} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'RemoveRoom',

  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)}
  },

  outputFields: {
    deletedRoomId: {
      type: GraphQLID,
      resolve: ({deletedRoomId}) => deletedRoomId
    },
    owner: {
      type: getType('Owner'),
      resolve: ({owner}) => owner
    }
  },

  mutateAndGetPayload: mutate
})
