const databaseConfig = require('./database-config');
const knex = require('knex')({
  client: 'postgresql',
  connection: {
    user: 'johny',
    password: 'peanut',
    database: 'truefluence'
  }
});

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
    .limit(1);
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

Database.prototype.upsertMedia = function (media) {
  return new Promise((resolve, reject) => {
    knex('medias')
      .count('*')
      .where('external_id', media.external_id)
      .then(result => {
        const count = Number(result[0].count);
        if (count> 0) {
          // do nothing for now
        } else {
          this.createMedia(media)
            .then(result => {
              //success
              resolve('complete');
            })
            .catch(err => {
              console.error(err);
            })
        }
      })
  })
}

Database.prototype.usernameExists = function (username) {
  return new Promise((resolve, reject) => {
    knex('users')
      .count('*')
      .where('username', username)
      .then(result => {
        resolve(result[0].count > 0);
      })
  })
}

Database.prototype.upsertUser = function (user) {
  return new Promise((resolve, reject) => {
    knex('users')
      .count('*')
      .where('external_id', user.external_id)
      .then(result => {
        const count = Number(result[0].count);
        if (count > 0) {
          this.updateUser(user)
            .then(result => {
              console.log('user updated');
              resolve(result);
            })
            .catch(err => {
              console.log('error updating user');
            })
        } else {
          this.createUser(user)
            .then(result => {
              console.log('user created');
              resolve(result);
            })
            .catch(err => {
              console.error(err);
            })
        }
        // resolve('complete');
      })
  })
}

Database.prototype.createMedia = function (media) {
  const timeNow = new Date(Date.now()).toISOString();
  media.created_at = timeNow;
  media.updated_at = timeNow;
  return knex('medias')
    .insert(media);
}

Database.prototype.updateMedia = function (media) {
  const timeNow = new Date(Date.now()).toISOString();
  media.updated_at = timeNow;
  return knex('medias')
    .where('external_id', media.external_id)
    .update(media);
}



exports.Database = Database;
