exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE owners (
      "id" serial,
      "name" text,
      "street" text,
      "postalCode" text,
      "postalArea" text,
      "location" point,
      "semesterStart" timestamp,
      "semesterEnd" timestamp,
      "email" citext UNIQUE NOT NULL,
      "salt" text NOT NULL,
      "password" text NOT NULL,
      PRIMARY KEY (id)
    ) TABLESPACE "pg_default";
  `)
}

exports.down = function(knex) {
  return knex.raw('DROP TABLE owners')
}
