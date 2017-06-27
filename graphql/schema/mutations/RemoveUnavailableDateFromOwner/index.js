import {GraphQLNonNull, GraphQLID} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'RemoveUnavailableDateFromOwner',

  inputFields: {
    dateId: {type: new GraphQLNonNull(GraphQLID)}
  },

  outputFields: {
    deletedDateId: {
      type: GraphQLID,
      resolve: ({deletedDateId}) => deletedDateId
    },
    owner: {
      type: getType('Owner'),
      resolve: ({owner}) => owner
    }
  },

  mutateAndGetPayload: mutate
})
