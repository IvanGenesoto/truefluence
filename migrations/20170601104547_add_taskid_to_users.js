exports.up = function(knex, Promise) {
  const query = knex.schema.table('users', table => {
    table.dropColumn('refreshed_at');
    table.integer('task_id').defaultTo(null);
  });

  return query;
};

exports.down = function(knex, Promise) {
  const query = knex.schema.table('users', table => {
    table.timestamp('refreshed_at').defaultTo(null);
    table.dropColumn('task_id');
  });
  return query;
};