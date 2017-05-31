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
    database.usernameExists(follower.username)
      .then(result => {
        if (result) {
          console.log('no');
          next();
        } else {
          database.queueExists(follower.username)
            .then(exist => {
              if (exist) {
                console.log('no user, but queue exists');
                next();
              } else {
                console.log('queueing new follower');
                const profile = {
                  username: follower.username,
                  primary_user_id: primaryUserId,
                  task_id: taskId,
                  created_at: timeNow
                }
                database.queueFollower(profile)
                  .then(confirm => {
                    next();
                  })
              }
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
              console.log(followers);
              queueFollowers(followers, result[0].primary_user_id, taskId);
            })
        })
    })
  // ig.getFollowers(req.body.userId, currentSession.session)
  // .then((result) => {
  //   console.log(result);
  // })
}

TaskManager.prototype.startNextTask = function () {

}

TaskManager.prototype.assignTask = function () {

}

module.exports = TaskManager;