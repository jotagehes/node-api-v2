/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('produtos').del()
  await knex('produtos').insert([
    {id: 1, descricao: 'Calabreza', marca: 'Sadia', valor: 200.00},
    {id: 2, descricao: 'Arroz', marca: 'Tio João', valor: 100.00},
    {id: 3, descricao: 'Ceveja', marca: 'Skol', valor: 400.00}
  ]);
};
