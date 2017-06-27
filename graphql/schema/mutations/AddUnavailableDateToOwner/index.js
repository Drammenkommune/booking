import {GraphQLString, GraphQLNonNull} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'AddUnavailableDateToOwner',

  inputFields: {
    startDate: {type: new GraphQLNonNull(GraphQLString)},
    endDate: {type: GraphQLString}
  },

  outputFields: {
    owner: {
      type: getType('Owner'),
      resolve: (owner) => owner
    }
  },

  mutateAndGetPayload: mutate
})
