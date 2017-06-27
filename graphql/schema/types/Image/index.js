import {GraphQLObjectType, GraphQLString} from 'graphql'
import {globalIdField} from 'graphql-relay'
import {getInterface} from '~/schema/lookup'

export default new GraphQLObjectType({
  name: 'Image',
  description: 'An image',

  fields: {
    id:  globalIdField('Image'),

    url: {
      description: 'The image URL',
      type: GraphQLString
    },

    thumbnail: {
      description: 'URL to the thumbnail of the image',
      type: GraphQLString
    }
  },

  interfaces: [getInterface('Node')]
})
