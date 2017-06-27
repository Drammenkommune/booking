import {GraphQLString, GraphQLID} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'UpdateOwner',

  inputFields: {
    ownerId: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    address: {type: GraphQLString},
    postalCode: {type: GraphQLString},
    postalArea: {type: GraphQLString},
    contactName: {type: GraphQLString},
    contactPhone: {type: GraphQLString}
  },

  outputFields: {
    owner: {
      type: getType('Owner'),
      resolve: owner => owner
    }
  },

  mutateAndGetPayload: mutate
})
