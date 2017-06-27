exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE facilities (
      "id" serial,
      "name" text,
      "roomId" integer,
      PRIMARY KEY (id),
      FOREIGN KEY ("roomId") REFERENCES rooms ON DELETE CASCADE
    ) TABLESPACE "pg_default";
  `)
}

exports.down = function(knex) {
  return knex.raw('DROP TABLE facilities')
}
