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

app.post('/analyze', (req, res) => {
  database.getTop
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

app.post('/gather', (req, res) => {

  scrapeSave(req.body.username)
    .then(ids => {
      ig.getFollowers(ids.external_id, currentSession.session)
        .then(followers => {
          async.mapSeries(followers, (follower, next) => {
            database.usernameExists(follower.username)
              .then(result => {
                if (result || follower.username == 'mostashformommy') { //formerly had result ||
                  next();
                } else {
                  scrapeRelateSave(follower.username, ids.id, next)
                    .then(result => {
                    })
                    .catch(err => {
                      console.error(err);
                      next();
                    })
                }
              })
          }, (err, data) => {
            database.topFollowed(ids.id)
              .then(top => {
                res.send(top);
              })
            // res.send(ids.id);
          })
        })
    })

  
});

function buildProfileList(userNames) {
  console.log('starting up');
  const profiles = []
  return new Promise((resolve, reject) => {
    function build(position) {
      console.log('looking up ' + userNames[position]);
      ig.getAccountByName(req.body.username, currentSession.session)
        .then((result) => {
          ig.getAccountById(result._params.id, currentSession.session)
            .then((idResult) => {
              profiles.push(idResult._params);
              if (position + 1 < userNames.length) {
                build(position + 1);
              } else {
                resolve('complete');
              }
            })
        })
    }
  })
  build(0)
}

app.post('/medias', (req, res) => {
    database.getMedias(req.body.userId)
      .then(result => {
        res.json(result);
      })

})

app.post('/media-stats', (req, res) => {
    database.getMedias(req.body.userId)
      .then(medias => {
        if (medias.length == 0) {
          res.json({ private: true, avLikes: 0, avComments: 0 })
        } else {
          const likes = medias.map(media => { return media.like_count; }).reduce((tot, val) => { return tot + val; }, 0);
          const comments = medias.map(media => { return media.comment_count; }).reduce((tot, val) => { return tot + val; }, 0);
          res.json({ private: false, avLikes: likes / medias.length, avComments: comments / medias.length });
        }
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

app.post('/followers', (req, res) => {
  ig.getFollowers(req.body.userId, currentSession.session)
    .then((result) => {
      res.json(result);
    })
})

// INITIALIZATION PROCEDURES HERE

ig.initialize()
  .then((session) => {
    currentSession.session = session;
  });

const PORT = 5760; // find default port

app.listen(PORT, () => {
  console.log('listening on port: ', PORT);
})