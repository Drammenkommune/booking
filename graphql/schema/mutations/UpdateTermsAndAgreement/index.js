import {GraphQLString, GraphQLID, GraphQLNonNull} from 'graphql'
import {mutationWithClientMutationId} from 'graphql-relay'
import {getType} from '~/schema/lookup'
import mutate from './mutator'

export default mutationWithClientMutationId({
  name: 'UpdateTermsAndAgreement',

  inputFields: {
    adminId: {type: new GraphQLNonNull(GraphQLID)},
    termsAndAgreement: {type: new GraphQLNonNull(GraphQLString)},
    pdfDownloadUrl: {type: GraphQLString},
    pdfFileName: {type: GraphQLString}
  },

  outputFields: {
    admin: {
      type: getType('Admin'),
      resolve: admin => admin
    }
  },

  mutateAndGetPayload: mutate
})
