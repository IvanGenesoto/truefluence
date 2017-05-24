const databaseConfig = require(./.database-config);
const knex = require('knex')(databaseConfig);

function Database() {

}

Database.prototype.clearTable = function (tablename) {
  return knex(tableName).truncate();
}

Database.prototype.getFollowers = function (userId) {
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

Database.prototype.createRelationship = function (userId, followingId, following) {
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

Database.prototype.updateRelationship = function (userId, followingId, following) {
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

Database.prototype.upsertRelationship = function (userId, followingId, following = true) {
  return new Promise((resolve, reject) => {
    knex('relationships')
      .count('*')
      .where('user_id', userId)
      .andWhere('following_id', followingId)
        .then(result => {
          const count = Number(result[0].count);
          if (count > 0) {
            // this.updateRelationship(userId, followingId, following)
            //   .then(result => {
            //     console.log('relationship updated for', userId);
            //   })
            //   .catch(err => {
            //     console.log('could not update relationship for', userId);
            //   });
          } else {
            this.createRelationship(userId, followingId, following)
              .then(result => {
                console.log('relationship created for', userId);
              })
              .catch(err => {
                console.log('could not create relationship for', userId);
              });
          }
          resolve('complete');
        })
  })
}

Database.prototype.getIdFromExternalId = function (externalId, tableName) {
  return knex(tableName)
    .where('external_id', externalId)
    .select('id')
    .limit(1)
}

Database.prototype.createUser = function (user) {
  const timeNow = new Date(Date.now()).toISOString();
  user.created_at = timeNow;
  user.updated_at = timeNow;
  return knex('users')
    .insert(user);
}

Database.prototype.updateUser = function (user) {
  const timeNow = new Date(Date.now()).toISOString();
  user.updated_at = timeNow;
  return knex('users')
    .where('external_id', user.external_id)
    .update(user);
}

Database.prototype.upsertUser = function (user) {
  return new Promise((resolve, reject) => {
    knex('users')
      .count('*')
      .where('external_id', user.external_id)
      .then(result => {
        const count = Number(result[0].count);
        if (count > 0) {
          // this.updateUser(user)
          //   .then(result => {
          //     console.log('user updated');
          //   })
          //   .catch(err => {
          //     console.log('error updating user');
          //   })
        } else {
          this.createUser(user)
            .then(result => {
              console.log('user created');
            })
            .catch(err => {
              console.log('error creating user');
            })
        }
        resolve('complete');
      })
  })
}

Database.prototype.createMedia = function (media) {
  const timeNow = new Date(Date.now()).toISOString();
  
}

exports.Database = Database;
