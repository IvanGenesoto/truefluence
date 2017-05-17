
exports.up = function(knex, Promise) {
  const query = knex.schema.createTable('medias', table => {
    table.increments('id');
    table.string('external_id');
    table.integer('user_id');
    table.string('image_low');
    table.string('image_standard');
    table.string('image_thumbnail');
    table.string('caption');
    table.string('link');
    table.specificType('user_tags', 'text[]');
    table.integer('like_count');
    table.integer('comment_count');
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.timestamp('posted_at');
    table.string('unique');
  });

  return query;
};

exports.down = function(knex, Promise) {
  const query = knex.schema.dropTable('medias');

  return query;
};
