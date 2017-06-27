import {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt} from 'graphql'
import {globalIdField} from 'graphql-relay'
import {getInterface, getType} from '~/schema/lookup'

import * as resolvers from './resolvers'

export default new GraphQLObjectType({
  name: 'User',
  description: 'A user which can book rooms',

  fields: {
    id:  globalIdField('User'),

    name: {
      description: 'Name of the user',
      type: GraphQLString
    },

    email: {
      description: 'Email for the user',
      type: GraphQLString
    },

    phone: {
      description: 'Phone number for the user',
      type: GraphQLString
    },

    aboutService: {
      description: 'A short description of the service',
      type: GraphQLString,
      resolve: resolvers.aboutService
    },

    termsAndAgreement: {
      description: 'Terms and agreement of using the service',
      type: GraphQLString,
      resolve: resolvers.termsAndAgreement
    },

    pdfFile: {
      description: 'PDF-file containing the contract for terms and agreement',
      type: getType('PDFFile'),
      resolve: resolvers.pdfFile
    },

    bookings: {
      description: 'All bookings the user has made',
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
        amount: {
          description: 'Integer limit to how many bookings to get',
          type: GraphQLInt
        }
      },
      resolve: resolvers.bookings
    },

    previousRooms: {
      description: 'Rooms that the user has previously booked, ordered by number of occurances',
      type: new GraphQLList(getType('Room')),
      resolve: resolvers.previousRooms
    }
  },

  interfaces: [getInterface('Node')]
})
