import {GraphQLNonNull, GraphQLID} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'RemoveOwner',

  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)}
  },

  outputFields: {
    deletedOwnerId: {
      type: GraphQLID,
      resolve: ({deletedOwnerId}) => deletedOwnerId
    },
    admin: {
      type: getType('Admin'),
      resolve: ({admin}) => admin
    }
  },

  mutateAndGetPayload: mutate
})
