import {GraphQLString, GraphQLNonNull} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'AddNameToUser',

  inputFields: {
    name: {type: new GraphQLNonNull(GraphQLString)},
    token: {type: new GraphQLNonNull(GraphQLString)},
  },

  outputFields: {
    user: {
      type: getType('User'),
      resolve: user => user
    }
  },

  mutateAndGetPayload: mutate
})
