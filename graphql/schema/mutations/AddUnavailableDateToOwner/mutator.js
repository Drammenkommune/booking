import {pg} from '~/db'

export default async (input, _, {rootValue: { viewer: { id } } }) => {
  const {startDate, endDate} = input
  const owner = await pg.connection.first('*').from('owners').where({id})

  return pg.connection
    .insert({startDate, endDate, ownerId: id})
    .into('unavailable_dates')
    .then(_ => owner)
}
