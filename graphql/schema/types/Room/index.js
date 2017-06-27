import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean} from 'graphql'
import {globalIdField} from 'graphql-relay'

import {getInterface, getEnum, getType} from '~/schema/lookup'
import * as resolvers from './resolvers'

export default new GraphQLObjectType({
  name: 'Room',
  description: 'A room',

  fields: () => ({
    id:  globalIdField('Room'),

    name: {
      description: 'Name of the room',
      type: GraphQLString
    },

    owner: {
      description: 'The owner of this room',
      type: getType('Owner'),
      resolve: resolvers.owner
    },

    address: {
      description: 'Address of room, based on owners address',
      type: GraphQLString,
      resolve: resolvers.address
    },

    ownerName: {
      description: 'The owner name of this room',
      type: GraphQLString,
      resolve: resolvers.ownerName
    },

    type: {
      description: 'What type of room this is',
      type: getEnum('RoomType')
    },

    contact: {
      description: 'Contact person with phone number',
      type: getType('ContactPerson'),
      resolve: resolvers.contactPerson
    },

    maxPeople: {
      description: 'Max number of people allowed in room',
      type: GraphQLInt
    },

    size: {
      description: 'Room size given in square meters',
      type: GraphQLInt
    },

    facilities: {
      description: 'Array of facilities the room provides',
      type: new GraphQLList(getEnum('FacilityType')),
      resolve: resolvers.facilities
    },

    info: {
      description: 'Additional information given by the room owner',
      type: GraphQLString
    },

    bookings: {
      description: 'All bookings for the room in a given time period',
      type: new GraphQLList(getType('Booking')),
      args: {
        start: {type: GraphQLString},
        end: {type: GraphQLString},
        amount: {type: GraphQLInt}
      },
      resolve: resolvers.bookings
    },

    recurringBookings: {
      description: 'A list of available bookings for recurring bookings',
      type: new GraphQLList(getType('Availability')),
      args: {
        start: {type: GraphQLString},
        end: {type: GraphQLString}
      },
      resolve: resolvers.recurring
    },

    unavailableDates: {
      description: 'All dates the room owner has listed as unavailable',
      type: new GraphQLList(getType('UnavailableDate')),
      args: {
        start: {type: GraphQLString},
        end: {type: GraphQLString}
      },
      resolve: resolvers.unavailableDates
    },

    images: {
      description: 'Array of image urls',
      type: new GraphQLList(getType('Image')),
      resolve: resolvers.images
    },

    semesterStart: {
      description: 'The start of the current, not able to book before this date',
      type: GraphQLString,
      resolve: resolvers.semesterStart
    },

    semesterEnd: {
      description: 'The end of the current semester, not able to book after this date',
      type: GraphQLString,
      resolve: resolvers.semesterEnd
    },

    deleted: {
      description: 'If the room is deleted or not',
      type: GraphQLBoolean
    }
  }),

  interfaces: [getInterface('Node')]
})
