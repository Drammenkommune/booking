import {GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList} from 'graphql'
import {globalIdField} from 'graphql-relay'
import {getInterface, getType} from '~/schema/lookup'

import * as resolvers from './resolvers'

export default new GraphQLObjectType({
  name: 'Booking',
  description: 'A booking of a given room',

  // fields need to be function because of circular dependency
  // https://gist.github.com/xicombd/77406c29ddf37fe46c3c#edit-fix
  fields: () => ({
    id:  globalIdField('Booking'),

    events: {
      description: 'Booking events in this booking',
      type: new GraphQLList(getType('BookingEvent')),
      args: {
        start: {
          description: 'Value to determine after which time we return events',
          type: GraphQLString
        },
        end: {
          description: 'Value to determine before which time we return events',
          type: GraphQLString
        }
      },
      resolve: resolvers.bookingEvents
    },

    recurring: {
      description: 'Boolean value saying if this booking contains multiple events or not',
      type: GraphQLBoolean
    },

    userComment: {
      description: 'Comment from the user',
      type: GraphQLString
    },

    ownerComment: {
      description: 'Comment from the owner',
      type: GraphQLString,
      resolve: resolvers.ownerComment
    },

    organization: {
      description: 'Organization the booking is for',
      type: GraphQLString,
      resolve: resolvers.organization
    },

    activity: {
      description: 'Organization the booking is for',
      type: GraphQLString,
      resolve: resolvers.activity
    },

    room: {
      description: 'The room that is booked',
      type: getType('Room'),
      resolve: resolvers.room
    },

    user: {
      description: 'User that has booked the room',
      type: getType('User'),
      resolve: resolvers.user
    }
  }),

  interfaces: [getInterface('Node')]
})
