exports.up = function(knex) {
  return knex.raw('ALTER TABLE owners RENAME COLUMN "street" TO "address"')
}

exports.down = function(knex) {
  return knex.raw('ALTER TABLE owners RENAME COLUMN "address" TO "street"')
}
