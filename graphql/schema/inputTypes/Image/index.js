import {GraphQLInputObjectType, GraphQLString} from 'graphql'

export default new GraphQLInputObjectType({
  name: 'ImageInput',
  fields: {
    url: {
      type: GraphQLString,
      description: 'URL to max size image'
    },

    thumbnail: {
      type: GraphQLString,
      description: 'URL to thumbnail of image'
    }
  }
})
