exports.development = {
  client: 'postgresql',
  connection: {
    user: 'johny',
    password: 'peanut',
    database: 'truefluence'
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations'
  }
};
