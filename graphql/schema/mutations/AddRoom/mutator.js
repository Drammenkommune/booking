import {pg} from '~/db'

export default async (input, _, {rootValue: { viewer: { id } } }) => {
  const ownerId = id
  const owner = await pg.connection.first('*').from('owners').where({id: ownerId})
  const {
    name, type, maxPeople,
    info, facilities, size, images
  } = input

  const newRoom = {
    name, type, maxPeople,
    size, info, ownerId
  }

  return pg.connection
    .insert(newRoom)
    .into('rooms')
    .returning('*')
    .then(res => {
      return Promise.all(
        facilities.map(facility => {
          return pg.connection
            .insert({
              name: facility,
              roomId: res[0].id
            })
            .into('facilities')
        }).concat(
          images.map(({url, thumbnail}) => {
            return pg.connection
              .insert({
                url,
                thumbnail,
                roomId: res[0].id
              })
              .into('images')
          })
        )
      )
      .then(_ => {
        return {
          room: res[0],
          owner
        }
      })
    })
}
