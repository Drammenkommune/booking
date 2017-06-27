import {GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString} from 'graphql'
import {toGlobalId} from 'graphql-relay'
import {getInterface} from '~/schema/lookup'

import * as resolvers from './resolvers'

export default new GraphQLObjectType({
  name: 'Viewer',
  description: 'A viewer',

  fields: {
    id:  {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (res) => {
        return toGlobalId('Viewer', res.id)
      }
    },
    name:  {
      description: 'The display name of the user',
      type: GraphQLString,
    },
    token: {
      type: GraphQLString,
      args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      resolve: resolvers.token
    }
  },

  interfaces: [getInterface('Node')]
})
