import {pg} from '~/db'
import {fromGlobalId} from 'graphql-relay'

export default async (input, _, {rootValue: { viewer: { id } } }) => {
  const dateId = fromGlobalId(input.dateId).id
  const owner = await pg.connection.first('*').from('owners').where({id})

  return pg.connection
    .delete()
    .from('unavailable_dates')
    .where({id: dateId})
    .then(_ => {
      return {
        deletedDateId: dateId,
        owner
      }
    })
}
