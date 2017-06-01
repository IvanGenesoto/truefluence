const Database = require('./database').Database;
const database = new Database();
const ParseScrape = require('./parse-scrape');
const Scraper = require('./scraper');
const Metrics = require('./metrics');
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

const scrapeRelateSave = (username, ownerId) => {
  return new Promise((resolve, reject) => {
    scrapeSave(username)
      .then(ids => {
        database.upsertRelationship(ids.id, ownerId, true)
          .then(result => {
            console.log()
            resolve(result);
          })
      })
      .catch(err => {
        reject(err);
      })
  })
}

function ScrapeBot(botName, id) {
  this.name = botName;
  this.ready = true;
  this.id = id;
}

ScrapeBot.prototype.startScrape = function () {
  const that = this;
  that.ready = false;
  return new Promise((resolve, reject) => {
    function scrape() {
      database.getNextQueue(that.id)
        .then(result => {
          console.log('get next queue: ', result);
          if (result[0]) {
            const username = result[0].username;
            const taskId = result[0].task_id;
            database.getTask(taskId)
              .then(task => {
                const primaryId = task[0].primary_user_id;
                scrapeRelateSave(username, primaryId)
                  .then(result => {
                    //remove task id
                    database.completeScrape(username)
                      .then(finish => {
                        console.log(that.name, 'scrape done');
                        scrape();
                      })
                  })
                  .catch(err => {
                    console.error(err);
                    scrape();
                  })

              })
          } else {
            // set status to ready
            that.ready = true;
            resolve('complete');
          }
        })
    }
    scrape();
  })
}

module.exports = ScrapeBot;

/*
remove every relationship where following id = 7 (mark)
*/