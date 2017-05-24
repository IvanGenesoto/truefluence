const path = require('path');
const watchify = require('watchify');
const express = require('express');
const bodyParser = require('body-parser');
const IG = require('./ig-main.js');
const ig = new IG();
const app = express();
const publicPath = path.join(__dirname, '/public');
const staticMiddleware = express.static(publicPath);
const Database = require('./database').Database;
const database = new Database();
const async = require('async');
const ParseScrape = require('./parse-scrape');
const Scraper = require('./scraper');
const Metrics = require('./metrics');

const currentSession = { initialized: false, session: {} };

app.use(staticMiddleware);
app.use(bodyParser.json());

const formatUser = rawJSON => {
  const user = {
    username: rawJSON.username,
    picture_url: rawJSON.picture,
    full_name: rawJSON.fullName,
    external_id: rawJSON.id,
    private: rawJSON.isPrivate,
    user_tags_count: rawJSON.usertagsCount,
    following_count: rawJSON.followingCount,
    follower_count: rawJSON.followerCount,
    bio: rawJSON.biography,
    post_count: rawJSON.mediaCount,
    external_url: rawJSON.externalUrl
  }
  return user;
}

app.post('/account', (req, res) => {
  ig.getAccountByName(req.body.username, currentSession.session)
    .then((result) => {
      ig.getAccountById(result._params.id, currentSession.session)
        .then((idResult) => {
          res.json(idResult._params);
        })
    })
})

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
  })
}

app.post('/gather', (req, res) => {
  res.send('started');
  scrapeSave(req.body.username)
    .then(ids => {
      console.log(ids);
      ig.getFollowers(ids.external_id, currentSession.session)
        .then(followers => {
          async.mapSeries(followers, (follower, next) => {
            database.usernameExists(follower.username)
              .then(result => {
                if (result) {
                  console.log('not even tryin');
                  next();
                } else {
                  scrapeRelateSave(follower.username, ids.id, next)
                    .then(result => {
                      console.log(result);
                    })
                }
              })
          })
        })
    })

  
});

const asyncCallback = () => {
  console.log('called back');
}
const tempCSV = [
  'eatify',
  '123chocula',
  'southerncoffeelover',
  'eatifyjohn',
  'miomiura'
]

function buildProfileList(userNames) {
  console.log('starting up');
  const profiles = []
  return new Promise((resolve, reject) => {
    function cb(position) {
      console.log('looking up ' + userNames[position]);
      ig.getAccountByName(req.body.username, currentSession.session)
        .then((result) => {
          ig.getAccountById(result._params.id, currentSession.session)
            .then((idResult) => {
              profiles.push(idResult._params);
              if (position + 1 < userNames.length) {
                cb(position + 1);
              } else {
                resolve('complete');
              }
            })
        })
    }
  })
  cb(0)
  console.log(profiles);
}

app.post('/media', (req, res) => {
    ig.getPosts(req.body.userId, currentSession.session)
      .then(result => {
        res.json(result);
      })
})

app.get('/csv', (req, res) => {
  new Promise((resolve, reject) => {
    const profiles = tempCSV.map((userName) => {
      return (
        ig.getAccountByName(userName, currentSession.session)
          .then((result) => {
            ig.getAccountById(result._params.id, currentSession.session)
              .then((idResult) => {
                console.log(idResult._params);
                return idResult._params;
              })
          })
      )
    });
    resolve(profiles);
  })
  .then((result) => {
    res.json(result);
  })
})

const rateTestIds = [
  '4634067144',
]
for (let i = 0; i < 2000; i++) {
  rateTestIds.push('4634067144');
}

app.post('/followers', (req, res) => {
  const followerDetails = [];
  ig.getFollowers(req.body.userId, currentSession.session)
    .then((result) => {
      res.json(result);
    })
})

ig.initialize()
  .then((session) => {
    currentSession.session = session;
  });

const PORT = 5760;

app.listen(PORT, () => {
  console.log('listening on port: ', PORT);
})

// defunct gather code. use for relationship logging later.

// .then(prod => {
//   ig.getAccountById(follower.id, currentSession.session)
//   .then(idResult => {
//     const user = formatUser(idResult._params);
//     database.upsertUser(user)
//     .then(result => {
//       console.log('follower added');
//       database.getIdFromExternalId(follower.id, 'users')
//       .then(result => {
//         database.upsertRelationship(result[0].id, userId)
//           .then(result => {
//             console.log(follower);
//             console.log(prod);
//             asyncCallback();
//           })
//       })
//     })
//   })
// })

    // var counter = 0;
    // const startTime = new Date();
    // Scraper(req.body.username)
    //   .then(primary => {
    //     Metrics(primary.user, primary.medias);
    //     // ig.getFollowers(primary.user.external_id, currentSession.session)
    //     //   .then(followers => {
    //     //     async.mapSeries(followers, (follower, next) => {
    //     //       Scraper(follower.username)
    //     //         .then(nextUser => {
    //     //           Metrics(nextUser.user, nextUser.medias);
    //     //           counter++;
    //     //           console.log(counter,'out of', followers.length);
    //     //           next();
    //     //         })
    //     //         .catch(err => {
    //     //           console.error(err);
    //     //         })
    //     //     }, (err, res) => {
    //     //       var endTime = new Date();
    //     //       console.log('elapsed time:', endTime - startTime);
    //     //     })
    //     //   })
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   })
  // var userId;
  // ig.getAccountById(req.body.userId, currentSession.session)
  //   .then((idResult) => {
  //     const user = formatUser(idResult._params);
  //     database.upsertUser(user)
  //       .then(result => {
  //         database.getIdFromExternalId(req.body.userId, 'users')
  //           .then(resulty => {
  //             console.log('user internal id', resulty[0].id);
  //             userId = resulty[0].id;
  //           })
  //       })
  //   })
  //   .then(result => {
  //     ig.getFollowers(req.body.userId, currentSession.session)
  //       .then((result) => {
  //         const followerIds = [];
  //         async.mapSeries(result, (follower, asyncCallback) => {
  //           new Promise((resolve, reject) => {
  //             setTimeout(() => {
  //               resolve('end');
  //             }, 3000)
  //           })

  //         })
  //         res.json(followerIds);
  //       })
  //   })