const Database = require('./database').Database;
const database = new Database();
const IG = require('./ig-main.js');
const ig = new IG();
const ParseScrape = require('./parse-scrape');
const Scraper = require('./scraper');
const async = require('async');

const scrapeSave = username => {
  var thisId;
  return new Promise((resolve, reject) => {
    Scraper(username)
      .then(primary => {
        Metrics(primary.user, primary.medias);
        database.upsertUser(primary.user)
          .then(result => {
            database.getIdFromExternalId(primary.user.external_id, 'users')
              .then(id => {
                async.mapSeries(primary.medias, (media, next) => {
                  database.upsertMedia(media)
                    .then(result => {
                      next();
                    })
                });
                  resolve({ id: id[0].id, external_id: primary.user.external_id });
              })
          })
      })
      .catch(err => {
        reject(err);
      })
  });
}

const scrapeRelateSave = (username, ownerId, callback) => {
  return new Promise((resolve, reject) => {
    scrapeSave(username)
      .then(ids => {
        database.upsertRelationship(ids.id, ownerId)
          .then(result => {
            callback();
            resolve(result);
          })
      })
      .catch(err => {
        callback();
        reject(err);
      })
  })
}

const queueFollowers = (followers, primaryUserId, taskId) => {
  console.log('queueFollowers activating!');
  const timeNow = new Date(Date.now()).toISOString();
  async.mapSeries(followers, (follower, next) => {
    database.getUserByUsername(follower.username)
      .then(result => {
        if (result) {
          console.log('old user, upserting relationship');
          database.upsertRelationship(result.id, primaryUserId, true)
            .then(related => {
              next();
            });
        } else {
          console.log('new user, inserting');
          const profile = {
            username: follower.username,
            picture_url: follower.picture,
            full_name: follower.fullName,
            external_id: follower.id,
            private: follower.isPrivate,
            refreshed_at: null,
          };
          database.upsertUser(profile)
            .then(newUser => {
              console.log('newUser:', newUser[0]);
              database.upsertRelationship(newUser[0], primaryUserId, true)
                .then(related => {
                  next();
                })
            })
        }
      })
  })
}

function TaskManager() {

}

TaskManager.prototype.startTask = function (taskId, session) { // FOR TEST PURPOSES ONLY
  database.getTask(taskId)
    .then(result => {
      database.getUserById(result[0].primary_user_id)
        .then(user => {
          // console.log(user.external_id);
          ig.getFollowers(user.external_id, session)
            .then(followers => {
              // console.log(followers);
              queueFollowers(followers, result[0].primary_user_id, taskId);
            })
        })
    })
  // ig.getFollowers(req.body.userId, currentSession.session)
  // .then((result) => {
  //   console.log(result);
  // })
}

TaskManager.prototype.assignQueue = function () {

}

TaskManager.prototype.startNextTask = function () {

}

TaskManager.prototype.assignTask = function () {

}

module.exports = TaskManager;