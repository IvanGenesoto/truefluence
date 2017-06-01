
exports.up = function(knex, Promise) {
  const query = knex.schema.table('users', table => {
    table.boolean('locked').notNull().defaultTo(false);
    table.timestamp('refreshed_at').defaultTo(null);
  });

  return query;
};

exports.down = function(knex, Promise) {
  const query = knex.schema.table('users', table => {
    table.dropColumn('locked');
    table.dropColumn('refreshed_at');
  });
  return query;
};