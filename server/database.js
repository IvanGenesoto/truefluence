const knex = require('knex')({
  clinet: 'postgresql',
  connection: {
    user: 'jyaaan',
    databae: 'truefluence'
  }
});

function Database() {

}

Database.prototype.clearTable = tablename => {
  return knex(tableName).truncate();
}
