require('dotenv').config();

module.exports = {
  'migrationDirectorty': 'migrations',
  'driver': 'pg',
  'host': process.env.MIGRATION_DB_HOST,
  'port': process.env.MIGRATION_DB_PORT,
  'database': process.env.MIGRATION_DB_NAME,
  'username': process.env.MIGRATION_DB_USER,
  'passsword': process.env.MIGRATION_DB_PASS
};