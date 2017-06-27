import {fromGlobalId} from 'graphql-relay'
import {pg} from '~/db'

const removeFacilities = (roomId, facilities) => {
  return facilities.map(facility => {
    return pg.connection
      .delete()
      .from('facilities')
      .where({roomId, name: facility})
  })
}

const addFacilities = (roomId, facilities) => {
  return facilities.map(facility => {
    return pg.connection
      .insert({name: facility, roomId})
      .into('facilities')
  })
}

const updateFacilities = (roomId, facilities) => {
  return pg.connection
    .select('*')
    .from('facilities')
    .where({roomId})
    .then(res => {
      const currentFacilities = res.map(facility => facility.name)
      const newFacilities = facilities
        .filter(facility => {
          return currentFacilities.indexOf(facility) === -1
        })
      const missingFacilities = currentFacilities
        .filter(currentFacility => {
          return facilities.indexOf(currentFacility) === -1
        })
      return Promise.all([
        ...removeFacilities(roomId, missingFacilities),
        ...addFacilities(roomId, newFacilities)
      ])
    })
}

const updateImages = (roomId, images) => {
  return pg.connection
    .delete()
    .from('images')
    .where({roomId})
    .then(_ => {
      return Promise.all(images.map(({url, thumbnail}) => {
        return pg.connection
          .insert({
            url,
            thumbnail,
            roomId,
          })
          .into('images')
      }))
    })
}

export default (input) => {
  const id = fromGlobalId(input.roomId).id
  const {
    name, type, maxPeople, images,
    size, facilities, info
  } = input

  return pg.connection
    .update({name, type, maxPeople, size, info})
    .from('rooms')
    .where({id})
    .returning('*')
    .then(res => {
      const room = res[0]
      return Promise.all([
        updateFacilities(room.id, facilities),
        updateImages(room.id, images)
      ])
      .then(_ => room)
    })
}
