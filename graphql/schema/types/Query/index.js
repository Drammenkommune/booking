import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql'
import {getType, getInterface} from '~/schema/lookup'
import * as resolvers from './resolvers'

export default new GraphQLObjectType({
  name: 'Query',

  fields: () => ({
    viewer: {
      description: 'User accessing the data',
      type: getType('Viewer'),
      resolve: ({viewer}) => {
        if (viewer) {
          const {id, name} = viewer
          return {id, name}
        }
        return {}
      }
    },

    node: {
      description: 'Fetches an object given its ID',
      type: getInterface('Node'),

      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The ID of an object'
        }
      },

      resolve: resolvers.node
    },

    search: {
      description: 'Returns a list of rooms that match the query',
      type: getType('Search'),
      resolve: () => { return { } }
    },

    admin: {
      description: 'Administrator of the system',
      type: getType('Admin'),
      resolve: resolvers.admin
    },

    owner: {
      description: 'Owner of rooms',
      type: getType('Owner'),
      resolve: resolvers.owner
    },

    user: {
      description: 'User of booking app',
      type: getType('User'),
      resolve: resolvers.user
    }
  })
})
