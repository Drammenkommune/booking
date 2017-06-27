exports.up = function(knex) {
  return knex.raw('ALTER TABLE owners DROP COLUMN "semesterStart", DROP COLUMN "semesterEnd"')
}

exports.down = function(knex) {
  return knex.raw('ALTER TABLE owners ADD COLUMN "semesterStart" text, ADD COLUMN "semesterEnd" text')
}
