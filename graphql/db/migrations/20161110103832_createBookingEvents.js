exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE "booking_events" (
      "id" serial,
      "start" bigserial,
      "end" bigserial,
      "bookingId" integer,
      "createdAt" timestamp with time zone DEFAULT now(),
      PRIMARY KEY (id),
      FOREIGN KEY ("bookingId") REFERENCES bookings ON DELETE CASCADE
    ) TABLESPACE "pg_default";
  `)
}

exports.down = function(knex) {
  return knex.raw('DROP TABLE booking_events')
}
