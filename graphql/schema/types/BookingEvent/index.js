import {GraphQLObjectType, GraphQLString} from 'graphql'
import {globalIdField} from 'graphql-relay'

export default new GraphQLObjectType({
  name: 'BookingEvent',
  description: 'An event in a given booking',

  fields: {
    id:  globalIdField('BookingEvent'),

    start: {
      description: 'Start time of the booking, given in Unix Time',
      type: GraphQLString
    },

    end: {
      description: 'End time of the booking, given in Unix Time',
      type: GraphQLString
    },

    organization: {
      description: 'Organization the booking is for',
      type: GraphQLString
    }
  }
})
