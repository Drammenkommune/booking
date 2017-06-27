exports.up = function(knex) {
  return knex.raw('ALTER TABLE admins ADD COLUMN "termsAndAgreement" text, ADD COLUMN "aboutService" text, ADD COLUMN "pdfDownloadUrl" text, ADD COLUMN "pdfFileName" text')
}

exports.down = function(knex) {
  return knex.raw('ALTER TABLE admins DROP COLUMN "termsAndAgreement", DROP COLUMN "aboutService", DROP COLUMN "pdfDownloadUrl", DROP COLUMN "pdfFileName"')
}
