import {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt} from 'graphql'
import {globalIdField} from 'graphql-relay'
import {getInterface, getType} from '~/schema/lookup'
import * as resolvers from './resolvers'

export default new GraphQLObjectType({
  name: 'Owner',
  description: 'Owner of rooms',

  fields: {
    id:  globalIdField('Owner'),

    name: {
      description: 'Name of the owner',
      type: GraphQLString
    },

    email: {
      description: 'Email of the owner',
      type: GraphQLString,
      resolve: resolvers.email
    },

    address: {
      description: 'Address to the owners location',
      type: GraphQLString
    },

    postalCode: {
      description: 'Postal code of the owners location',
      type: GraphQLString
    },

    postalArea: {
      description: 'Postal area of the owners location',
      type: GraphQLString
    },

    rooms: {
      description: 'Rooms owned by this owner',
      type: new GraphQLList(getType('Room')),
      resolve: resolvers.rooms
    },

    contact: {
      description: 'Contact person for the owner',
      type: getType('ContactPerson'),
      resolve: resolvers.contactPerson
    },

    unavailableDates: {
      description: 'Dates no rooms owned by this owner can be booked on',
      type: new GraphQLList(getType('UnavailableDate')),
      resolve: resolvers.unavailableDates
    },

    termsAndAgreement: {
      description: 'Terms and agreement of using the service',
      type: GraphQLString,
      resolve: resolvers.termsAndAgreement
    },

    bookings: {
      description: 'All bookings on rooms owned by this owner',
      type: new GraphQLList(getType('Booking')),
      args: {
        start: {
          description: 'Return bookings starting after this time, given in Unix Time',
          type: GraphQLString
        },
        end: {
          description: 'Return bookings ending before this time, given in Unix Time',
          type: GraphQLString
        },
        amount: { type: GraphQLInt }
      },
      resolve: resolvers.bookings
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
