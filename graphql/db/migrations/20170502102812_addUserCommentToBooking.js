exports.up = function(knex) {
  return knex.raw('ALTER TABLE bookings ADD COLUMN "userComment" text')
}

exports.down = function(knex) {
  return knex.raw('ALTER TABLE bookings DROP COLUMN "userComment"')
}
