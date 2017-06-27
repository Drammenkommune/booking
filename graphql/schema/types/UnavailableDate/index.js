import {GraphQLObjectType, GraphQLString} from 'graphql'
import {globalIdField} from 'graphql-relay'

export default new GraphQLObjectType({
  name: 'UnavailableDate',
  description: 'A date an owner can\'t be booked',

  fields: {
    id:  globalIdField('UnavailableDate'),

    startDate: {
      description: 'The date, or start date if period.',
      type: GraphQLString
    },

    endDate: {
      description: 'End date, only present if period.',
      type: GraphQLString
    }
  }
})
