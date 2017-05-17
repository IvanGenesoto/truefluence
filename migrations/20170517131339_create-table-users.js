
exports.up = function(knex, Promise) {
  const query = knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('username');
    table.string('picture_url');
    table.string('full_name');
    table.string('external_id');
    table.boolean('private');
    table.integer('user_tags_count');
    table.integer('following_count');
    table.integer('follower_count');
    table.string('bio');
    table.integer('post_count');
    table.string('external_url');
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.string('instagram_token');
    table.integer('recent_like_count');
    table.integer('recent_comment_count');
    table.decimal('truefluence_score');
    table.string('unique');
  });

  return query;
};

exports.down = function(knex, Promise) {
  const query = knex.schema.dropTable('users');

  return query;
};
