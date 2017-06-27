exports.up = function(knex) {
  return knex.raw('ALTER TABLE owners ADD COLUMN "deleted" boolean DEFAULT FALSE')
}

exports.down = function(knex) {
  return knex.raw('ALTER TABLE owners DROP COLUMN "deleted"')
}
