exports.up = function(knex) {
  return knex.raw(`
      CREATE EXTENSION chkpass
  `)
}

exports.down = function(knex) {
  return knex.raw('DROP EXTENSION chkpass')
}
