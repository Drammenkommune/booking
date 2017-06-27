exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE "unavailable_dates" (
      "id" serial,
      "startDate" text,
      "endDate" text,
      "ownerId" integer,
      "createdAt" timestamp with time zone DEFAULT now(),
      PRIMARY KEY (id),
      FOREIGN KEY ("ownerId") REFERENCES owners ON DELETE CASCADE
    ) TABLESPACE "pg_default";
  `)
}

exports.down = function(knex) {
  return knex.raw('DROP TABLE unavailable_dates')
}
