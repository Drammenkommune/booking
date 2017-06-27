import {GraphQLString} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'UpdateSemester',

  inputFields: {
    semesterStart: {type: GraphQLString},
    semesterEnd: {type: GraphQLString},
  },

  outputFields: {
    admin: {
      type: getType('Admin'),
      resolve: admin => admin
    }
  },

  mutateAndGetPayload: mutate
})
