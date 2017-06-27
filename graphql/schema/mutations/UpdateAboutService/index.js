import {GraphQLString, GraphQLID, GraphQLNonNull} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'UpdateAboutService',

  inputFields: {
    adminId: {type: new GraphQLNonNull(GraphQLID)},
    aboutService: {type: new GraphQLNonNull(GraphQLString)}
  },

  outputFields: {
    admin: {
      type: getType('Admin'),
      resolve: admin => admin
    }
  },

  mutateAndGetPayload: mutate
})
