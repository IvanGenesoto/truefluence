
exports.up = function(knex, Promise) {
  const query = knex.schema.createTable('queued-profiles', table => {
    table.integer('primary_user_id').notNull();
    table.string('username').notNull();
    table.string('assigned_bot').notNull().defaultTo('');
    table.integer('task_id').notNull();
    table.timestamp('created_at').notNull();
  });

  return query;
};

exports.down = function(knex, Promise) {
    const query = knex.schema.dropTable('queued-profiles');
    return query;
};
