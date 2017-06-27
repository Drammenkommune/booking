exports.up = function(knex) {
  return knex.raw(`
      CREATE EXTENSION citext
  `)
}

exports.down = function(knex) {
  return knex.raw('DROP EXTENSION citext')
}
