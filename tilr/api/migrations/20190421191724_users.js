exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table
      .increments('user_id')
    table
      .string('name')
      .unique()
      .notNullable()
    table
      .string('password')
      .notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users')
}
