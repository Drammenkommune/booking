import {GraphQLObjectType, GraphQLString} from 'graphql'
import {globalIdField} from 'graphql-relay'
import {getInterface} from '~/schema/lookup'

export default new GraphQLObjectType({
  name: 'PDFFile',
  description: 'A PDF file containing a contract for terms and agreement',

  fields: {
    id:  globalIdField('Booking'),

    name: {
      type: GraphQLString,
      description: 'File name'
    },

    downloadUrl: {
      type: GraphQLString,
      description: 'Location where the file can be downloaded'
    }
  },

  interfaces: [getInterface('Node')]
})
