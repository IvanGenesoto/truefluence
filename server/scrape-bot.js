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
        console.log('upsertrelationship:', ids.id, ownerId);
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

function ScrapeBot() {

}

ScrapeBot.prototype.startScrape = function (primaryId) {
  return new Promise((resolve, reject) => {
    function scrape() {
      database.getNextQueue(1)
        .then(result => {
          if (result[0]) {
            const username = result[0].username;
            scrapeRelateSave(username, primaryId)
              .then(result => {
                //remove task id
                database.completeScrape(username)
                  .then(finish => {
                    console.log('scrape done');
                    scrape();
                  })
              })
              .catch(err => {
                console.error(err);
                scrape();
              })
          } else {
            resolve('complete');
          }
        })
    }
    scrape();
  })
}

module.exports = ScrapeBot;

/*


truefluence=> select username, external_id from users where task_id = 4;
           username            | external_id
-------------------------------+-------------
 evan394                       | 314321072
 _happy_doggies_               | 3986200022
 salvydog                      | 5534393052
 jeremyisworm                  | 2295145926
 jilleverton                   | 15890960
 corriewinebender              | 254144916
 joannalhurt                   | 229608526
 vanavicious                   | 3552999524
 raquelott.real.estate         | 1318050567
 shaddinger33                  | 31743975
 michaelmte                    | 512034972
 jkrow1313                     | 3148314627
 sister_smith_pup              | 5462488995
 red.jah                       | 5453114760
 quantracycherry               | 474214854
 courtneybreelucas             | 213725480
 spencer_kc                    | 1584647809
 gladstonefiredepartment       | 5406336083
 ryjoindustries                | 584730775
 spence74                      | 4748110306
 holamariia                    | 4785210
 johngunter78                  | 5397077024
 dajo1273                      | 33612489
 robotick                      | 243514590
 swflinn                       | 30843631
 poppyandfinn                  | 54164454
 scottalena                    | 475334271
 breweryemperial               | 3200594817
 ashmgreen9                    | 144222025
 blamejohnbriley               | 3121614476
 katieflynn81                  | 1798335984
 bigchelzzz82                  | 294133200
 bmase26                       | 2278353636
 _wizardsneverdie              | 218140408
 hottubcrochetmachine          | 4886370491
 nickriojas                    | 46170283
 damonwilson76                 | 4832715907
 therescueprojectkc            | 4136289501
 paydayloan.realfast           | 2946490920
 ucuida97                      | 4577984196
 scall83                       | 178079880
*/