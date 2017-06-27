import {pg} from '~/db'
import createOwner from '~/lib/utils/createOwner'

const owners = [
  {
    name: 'Danvik skole',
    address: 'Danvikbakken 2',
    postalCode: '3046',
    postalArea: 'Drammen',
    location: '59.7350239, 10.1932741',
    email: 'danvik.skole@drmk.no',
    password: 'forord-egg-avlasting'
  },

  {
    name: 'Vestbygda skole',
    address: 'Jordbrekkveien 3',
    postalCode: '3039',
    postalArea: 'Drammen',
    location: '59.6959303, 10.1633818',
    email: 'vestbygda.skole@drmk.no',
    password: 'fantom-noe-vind'
  },

  {
    name: 'Marienlyst skole',
    address: 'Schwartz gate 12',
    postalCode: '3043',
    postalArea: 'Drammen',
    location: '59.7335661, 10.2003231',
    email: 'marienlyst.skole@drmk.no',
    password: 'tiger-rosa-sentrum'
  },

  {
    name: 'Åskollen skole',
    address: 'Tverrliggeren 10',
    postalCode: '3038',
    postalArea: 'Drammen',
    location: '59.7128274, 10.2581067',
    email: 'askollen.skole@drmk.no',
    password: 'varetekt-tilgang-fugl'
  },

  {
    name: 'Gulskogen Skole',
    address: 'Vintergata 8',
    postalCode: '3048',
    postalArea: 'Drammen',
    location: '59.7411681, 10.1688134',
    email: 'gulskogen.skole@drmk.no',
    password: 'donasjon-sol-fugl'
  }
]

async function createOwnerUnlessExists(owner) {
  const existing = await pg.connection.first('id').from('owners').where({name: owner.name})
  return existing
    ? Promise.resolve()
    : createOwner(owner)
}

export default function createOwners() {
  return Promise.all(owners.map(createOwnerUnlessExists))
}
