import {GraphQLObjectType, GraphQLString} from 'graphql'
import {globalIdField} from 'graphql-relay'

export default new GraphQLObjectType({
  name: 'Availability',
  description: 'A status for availability on a room',

  fields: {
    id:  globalIdField('Availability'),

    status: {
      description: 'The status.',
      type: GraphQLString
    }
  }
})
