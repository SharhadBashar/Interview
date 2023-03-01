exports.up = function (knex) {
  return knex.schema.createTable('questions', (table) => {
    table.increments('question_id')
    table.string('text')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('questions')
}
