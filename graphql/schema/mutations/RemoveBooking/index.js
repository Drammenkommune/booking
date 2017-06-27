import {GraphQLNonNull, GraphQLID, GraphQLString} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'RemoveBooking',

  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    message: {type: GraphQLString}
  },

  outputFields: {
    deletedBookingId: {
      type: GraphQLID,
      resolve: ({deletedBookingId}) => deletedBookingId
    },
    room: {
      type: getType('Room'),
      resolve: ({room}) => room
    },
    owner: {
      type: getType('Owner'),
      resolve: ({owner}) => owner
    },
    user: {
      type: getType('User'),
      resolve: ({user}) => user
    }
  },

  mutateAndGetPayload: mutate
})
