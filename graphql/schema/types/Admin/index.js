import {
  GraphQLObjectType, GraphQLNonNull,
  GraphQLID, GraphQLString, GraphQLList
} from 'graphql'
import {toGlobalId} from 'graphql-relay'
import {getInterface, getType} from '~/schema/lookup'

import * as resolvers from './resolvers'

export default new GraphQLObjectType({
  name: 'Admin',
  description: 'An administrator',

  fields: {
    id:  {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (res) => toGlobalId('Admin', res.id)
    },

    email: {
      type: GraphQLString,
      description: 'Email adress connected to the administrator account'
    },

    semesterStart: {
      type: GraphQLString,
      description: 'Date which marks the start of the current semester'
    },

    semesterEnd: {
      type: GraphQLString,
      description: 'Date which marks the start of the current semester'
    },

    aboutService: {
      description: 'A short description of the service',
      type: GraphQLString,
      resolve: resolvers.aboutService
    },

    termsAndAgreement: {
      description: 'A short description of the service',
      type: GraphQLString,
      resolve: resolvers.termsAndAgreement
    },

    pdfFile: {
      description: 'PDF-file containing the contract for terms and agreement',
      type: getType('PDFFile'),
      resolve: resolvers.pdfFile
    },

    owners: {
      type: new GraphQLList(getType('Owner')),
      description: 'All owners in the system',
      resolve: resolvers.owners
    },

    token: {
      type: GraphQLString,
      args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      resolve: resolvers.token
    },

    uploadUrl: {
      description: 'A one-time URL that can be used to upload a file',
      type: GraphQLString,
      args: {
        filename: {type: GraphQLString},
        filetype: {type: GraphQLString},
      },
      resolve: resolvers.uploadUrl,
    },
  },

  interfaces: [getInterface('Node')]
})
