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

Database.prototype.createRelationship = (userId, followingId, following) => {
  const timeNow = new Date(Date.now()).toISOString();
  const relationship = {
    user_id: userId,
    following_id: followingId,
    created_at: timeNow,
    updated_at: timeNow,
    following: following
  };
  return knex('relationships')
  .insert(relationship);
}

Database.prototype.updateRelationship = (userId, followingId, following) => {
  const timeNow = new Date(Date.now()).toISOString();
  const relationship = {
    updated_at: timeNow,
    following: following
  };
  return knex('relationships')
    .where('user_id', userId)
    .andWhere('following_id', followingId)
    .update(relationship);
}

Database.prototype.upsertRelationship = (userId, followingId, following = true) => {
  return new Promise((resolve, reject) => {
    knex('relationships')
      .count('*')
      .where('user_id', userId)
      .andWhere('following_id', followingId)
        .then(result => {
          const count = Number(result[0].count);
          if (count > 0) {
            this.updateRelationship(userId, followingId, following)
              .then(result => {
                console.log('relationship updated for', userId);
              })
              .catch(err => {
                console.log('could not update relationship for', userId);
              });
          } else {
            this.createRelationship(userId, followingId, following)
              .then(result => {
                console.log('relationship created for', userId);
              })
              .catch(err => {
                console.log('could not create relationship for', userId);
              });
          }
        })
  })
}

Database.prototype.createUser = params => {

}

Database.prototype.updateUser = params => {
  
}

Database.prototype.upsertUser = params => {

}
