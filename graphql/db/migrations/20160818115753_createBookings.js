exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE bookings (
      "id" serial,
      "userId" integer,
      "roomId" integer,
      "organization" text,
      "recurring" boolean DEFAULT false,
      "createdAt" timestamp with time zone DEFAULT now(),
      PRIMARY KEY (id),
      FOREIGN KEY ("roomId") REFERENCES rooms ON DELETE CASCADE,
      FOREIGN KEY ("userId") REFERENCES users ON DELETE CASCADE
    ) TABLESPACE "pg_default";
  `)
}

exports.down = function(knex) {
  return knex.raw('DROP TABLE bookings')
}
