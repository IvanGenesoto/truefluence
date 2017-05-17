
exports.up = function(knex, Promise) {
  const query = knex.schema.createTable('relationships', table => {
    table.integer('user_id');
    table.integer('following_id');
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.boolean('following');
    table.unique( ['user_id','following_id'] );
  })

  return query;
};

exports.down = function(knex, Promise) {
  const query = knex.schema.dropTable('relationships');

  return query;
};
