import {GraphQLSchema} from 'graphql'
import {getType} from './lookup'

export default new GraphQLSchema({
  query: getType('Query'),
  mutation: getType('Mutation'),
  types: [getType('Owner')]
})
