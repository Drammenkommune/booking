exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE rooms (
      "id" serial,
      "name" text,
      "type" text,
      "info" text,
      "ownerId" integer,
      "size" integer,
      "maxPeople" integer,
      "contactName" text,
      "contactPhone" text,
      "active" boolean DEFAULT false,
      PRIMARY KEY (id),
      FOREIGN KEY ("ownerId") REFERENCES owners ON DELETE CASCADE
    ) TABLESPACE "pg_default";
  `)
}

exports.down = function(knex) {
  return knex.raw('DROP TABLE rooms')
}
