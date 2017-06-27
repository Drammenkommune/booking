exports.up = function(knex) {
  return knex.raw('ALTER TABLE bookings ADD COLUMN "ownerComment" text')
}

exports.down = function(knex) {
  return knex.raw('ALTER TABLE bookings DROP COLUMN "ownerComment"')
}
