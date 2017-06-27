import {GraphQLNonNull, GraphQLID, GraphQLString} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'RemoveBookingEvent',

  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    message: {type: GraphQLString}
  },

  outputFields: {
    deletedBookingEventId: {
      type: GraphQLID,
      resolve: ({deletedBookingId}) => deletedBookingId
    },
    booking: {
      type: getType('Booking'),
      resolve: ({booking}) => booking
    }
  },

  mutateAndGetPayload: mutate
})
