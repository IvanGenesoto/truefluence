
exports.up = function(knex, Promise) {
  const query = knex.schema.createTable('medias', table => {
    table.increments('id').notNull();
    table.string('external_id').notNull();
    table.unique('external_id');
    table.integer('user_id').notNull();
    table.string('image_low').notNull().defaultTo('');
    table.string('image_standard').notNull().defaultTo('');
    table.string('image_thumbnail').notNull().defaultTo('');
    table.text('caption').notNull().defaultTo('');
    table.string('link').notNull().defaultTo('');
    table.specificType('user_tags', 'text[]').notNull();
    table.integer('like_count').notNull().defaultTo(0);
    table.integer('comment_count').notNull();
    table.timestamp('created_at').notNull();
    table.timestamp('updated_at').notNull();
    table.timestamp('posted_at').notNull();
  });

  return query;
};

exports.down = function(knex, Promise) {
  const query = knex.schema.dropTable('medias');

  return query;
};
