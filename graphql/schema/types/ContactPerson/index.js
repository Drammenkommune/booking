import {GraphQLObjectType, GraphQLString} from 'graphql'
import {globalIdField} from 'graphql-relay'
import {getInterface} from '~/schema/lookup'

export default new GraphQLObjectType({
  name: 'ContactPerson',
  description: 'A contact person for a given room',

  fields: {
    id:  globalIdField('ContactPerson'),

    name: {
      description: 'Name of the contact person',
      type: GraphQLString
    },

    phoneNumber: {
      description: 'Phone number for the contact person',
      type: GraphQLString
    }

  },

  interfaces: [getInterface('Node')]
})
