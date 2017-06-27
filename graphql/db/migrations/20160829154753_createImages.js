
exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE images (
      "id" serial,
      "roomId" integer,
      "url" text,
      PRIMARY KEY (id),
      FOREIGN KEY ("roomId") REFERENCES rooms ON DELETE CASCADE
    ) TABLESPACE "pg_default";
  `)
}

exports.down = function(knex) {
  return knex.raw('DROP TABLE images')
}
