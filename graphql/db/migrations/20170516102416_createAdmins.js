exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE admins (
      "id" serial,
      "email" citext UNIQUE NOT NULL,
      "semesterStart" timestamp,
      "semesterEnd" timestamp,
      "salt" text NOT NULL,
      "password" text NOT NULL,
      PRIMARY KEY (id)
    ) TABLESPACE "pg_default";
  `)
}

exports.down = function(knex) {
  return knex.raw('DROP TABLE admins')
}
