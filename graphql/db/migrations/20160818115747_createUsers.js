exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE users (
      "id" serial,
      "name" text,
      "email" text,
      "phone" text,
      "ssn" text UNIQUE,
      "lastSyncIdPorten" timestamp with time zone DEFAULT now(),
      PRIMARY KEY (id)
    ) TABLESPACE "pg_default";
  `)
}

exports.down = function(knex) {
  return knex.raw('DROP TABLE users')
}
