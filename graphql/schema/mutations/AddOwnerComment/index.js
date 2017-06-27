import {GraphQLString, GraphQLNonNull, GraphQLID} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'AddOwnerComment',

  inputFields: {
    ownerComment: {type: GraphQLString},
    bookingId: {type: new GraphQLNonNull(GraphQLID)},
  },

  outputFields: {
    booking: {
      type: getType('Booking'),
      resolve: ({booking}) => booking
    }
  },

  mutateAndGetPayload: mutate
})
