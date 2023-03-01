exports.seed = async (knex) => {
  await knex.batchInsert('questions', [
    { text: 'Are the Leafs ever going to win the Stanley Cup again?' },
    { text: 'Is pineapple an appropriate pizza topping?' },
    { text: 'Is beer an appropriate breakfast drink?' }
  ])
}
