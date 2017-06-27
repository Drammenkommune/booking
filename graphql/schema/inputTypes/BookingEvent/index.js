import {GraphQLInputObjectType, GraphQLString} from 'graphql'

export default new GraphQLInputObjectType({
  name: 'InputBookingEvent',
  fields: {
    day: {
      type: GraphQLString,
      description: 'Day of the event'
    },

    start: {
      type: GraphQLString,
      description: 'Start of event'
    },

    end: {
      type: GraphQLString,
      description: 'End of event'
    }
  }
})
