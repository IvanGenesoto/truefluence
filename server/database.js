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

Database.prototype.getFollowers = userId => {
  return new Promise((resolve, reject) => {
    knex('relationships')
      .select('user_id')
      .where('following_id', userId)
      .andWhere('following', true)
      .then(result => {
        resolve(result);
      })
  })
}

Database.prototype.createRelationship = (userId, followingId) => {
  const timeNow = new Date(Date.now()).toISOString();
  const relationship = {
    user_id: userId,
    following_id: followingId,
    created_at: timeNow,
    updated_at: timeNow,
    following: true
  }
  return knex('relationships')
    .insert(relationship);
}
