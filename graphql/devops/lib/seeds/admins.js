import {pg} from '~/db'
import createAdmin from '~/lib/utils/createAdmin'

const admins = [
  {
    email: 'bookingadmin',
    password: 'kake-stekepanne-sol',
    semesterStart: 'Mon Jan 03 2017 00:00:00',
    semesterEnd: 'Tue Jun 20 2017 00:00:00',
    aboutService: `\
Her kan du booke lokaler til møter, øvinger, treninger mm for din organisasjon eller forening.
Du finner lett oversikt over ledige lokaler, fasiliteter, størrelse og mye mer.
Logg inn med ID-porten for å bruke tjenesten.`,
    termsAndAgreement: `Det kreves at ansvarshavende er over 18 år.

Leietager har ansvar for å sikre at uvedkommende ikke kommer inn i bygget.

All skade, uhell eller ødeleggelse bekostes av leietager.

Lokalet skal overleveres i like god stand som det ble overtatt.

Utløses brannalarm er leietager ansvarlig for det, også økonomisk.

Det er ikke tillatt å drikke alkohol eller å være på skolens område i påvirket tilstand. Oppbevaring av alkohol er forbudt.

Det er ikke tillatt å røyke eller bruke åpen ild skolens lokaler eller uteområde.

Dører og vinduer skal være lukket og låst etter bruk.

Nøkkel hentes og leveres til avtalt tidspunkt. Tapt nøkkel utløser erstatning til selvkost.

Branninstruks og brannreglement skal være lest og gjennomgått. Ved overnatting må brannvesenet søkes om bruksendring god tid i forveien.`
  }
]

async function createAdminUnlessExists(admin) {
  const existing = await pg.connection.first('id').from('admins').where({email: admin.email})
  return existing
    ? Promise.resolve()
    : createAdmin(admin)
}

export default function createAdmins() {
  return Promise.all(admins.map(createAdminUnlessExists))
}
