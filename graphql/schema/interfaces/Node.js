import {GraphQLNonNull, GraphQLInterfaceType, GraphQLID} from 'graphql'
import {getType} from '~/schema/lookup'

const NodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  description: 'An object with an ID',

  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the object.',
    },
  }),

  resolveType: (obj) => (
    getType(obj.__typename)
  )
})

export default NodeInterface
