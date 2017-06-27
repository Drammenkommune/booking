import {GraphQLObjectType} from 'graphql'
import * as mutations from '~/schema/mutations'

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: mutations
})
