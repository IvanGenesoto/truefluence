exports.development = {
  client: 'postgresql',
  connection: {
    user: 'johny',
    database: 'truefluence'
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations'
  }
};
