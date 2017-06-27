import {GraphQLBoolean, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType, getInputType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'AddBooking',

  inputFields: {
    events: {type: new GraphQLList(getInputType('BookingEvent'))},
    roomId: {type: new GraphQLNonNull(GraphQLID)},
    userId: {type: GraphQLID},
    organization: {type: new GraphQLNonNull(GraphQLString)},
    activity: {type: new GraphQLNonNull(GraphQLString)},
    userComment: {type: GraphQLString},
    recurring: {type: GraphQLBoolean}
  },

  outputFields: {
    room: {
      type: getType('Room'),
      resolve: ({room}) => room
    },
    booking: {
      type: getType('Booking'),
      resolve: ({booking}) => booking
    }
  },

  mutateAndGetPayload: mutate
})
