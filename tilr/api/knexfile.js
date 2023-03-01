module.exports = {
  client: 'postgresql',
  connection: 'postgresql://dev:password@localhost:5432/tilr_interview',
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './seeds'
  },
}
