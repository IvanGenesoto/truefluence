const Database = require('./database').Database;
const database = new Database();
const IG = require('./ig-main.js');
const ig = new IG();
const ParseScrape = require('./parse-scrape');
const Scraper = require('./scraper');

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