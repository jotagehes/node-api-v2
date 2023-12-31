/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable ('usuarios', table => {
    table.increments('id').primary()
    table.string ('nome').notNullable().unique()
    table.string ('email').notNullable()
    table.string ('login').notNullable().unique()
    table.string ('senha').notNullable()
    table.string ('roles').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable ('usuarios')
};
