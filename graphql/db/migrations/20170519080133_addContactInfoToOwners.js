exports.up = function(knex) {
  return knex.raw('ALTER TABLE owners ADD COLUMN "contactName" text, ADD COLUMN "contactPhone" text')
}

exports.down = function(knex) {
  return knex.raw('ALTER TABLE owners DROP COLUMN "contactName", DROP COLUMN "contactPhone"')
}
