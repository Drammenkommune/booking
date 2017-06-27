exports.up = function(knex) {
  return knex.raw('ALTER TABLE images ADD COLUMN "thumbnail" text')
}

exports.down = function(knex) {
  return knex.raw('ALTER TABLE images DROP COLUMN "thumbnail"')
}
