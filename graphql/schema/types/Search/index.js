import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql'
import {getType} from '~/schema/lookup'
import * as resolvers from './resolvers'

export default new GraphQLObjectType({
  name: 'Search',
  description: 'A type allowing searching of rooms',

  fields: {
    rooms: {
      description: 'Returns a list of rooms that match the query',
      type: new GraphQLList(getType('Room')),
      args: {
        q: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The query to match rooms against'
        },
        ownerId: {
          type: GraphQLID,
          description: 'Id of the owner of the room'
        },
        roomType: {
          type: GraphQLString,
          description: 'Room type of the room'
        }
      },
      resolve: resolvers.rooms
    },
    room: {
      description: 'Returns a room that matches the given id',
      type: getType('Room'),
      args: {
        roomId: {
          type: GraphQLString,
          description: 'The room id'
        }
      },
      resolve: resolvers.room
    },

    owners: {
      description: 'Returns a list of owners',
      type: new GraphQLList(getType('Owner')),
      resolve: resolvers.owners
    }
  },
})
