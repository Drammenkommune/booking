import {GraphQLString, GraphQLNonNull} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'AddOwner',

  inputFields: {
    name: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)},
    address: {type: new GraphQLNonNull(GraphQLString)},
    postalCode: {type: new GraphQLNonNull(GraphQLString)},
    postalArea: {type: new GraphQLNonNull(GraphQLString)},
    contactName: {type: GraphQLString},
    contactPhone: {type: GraphQLString}
  },

  outputFields: {
    owner: {
      type: getType('Owner'),
      resolve: ({owner}) => owner
    }
  },

  mutateAndGetPayload: mutate
})
