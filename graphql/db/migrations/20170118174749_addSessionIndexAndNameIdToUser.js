exports.up = function(knex) {
  return knex.raw('ALTER TABLE users ADD COLUMN "sessionIndex" text, ADD COLUMN "nameId" text')
}

exports.down = function(knex) {
  return knex.raw('ALTER TABLE users DROP COLUMN "sessionIndex", DROP COLUMN "nameId"')
}
