exports.up = function(knex) {
  return knex.raw('ALTER TABLE rooms ADD COLUMN "deleted" boolean DEFAULT false')
}

exports.down = function(knex) {
  return knex.raw('ALTER TABLE rooms DROP COLUMN "deleted"')
}
