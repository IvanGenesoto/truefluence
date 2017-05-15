const path = require('path');
const watchify = require('watchify');
const express = require('express');
const bodyParser = require('body-parser');
const IG = require('./ig-main.js');
const ig = new IG();
const app = express();
const publicPath = path.join(__dirname, '/public');
const staticMiddleware = express.static(publicPath);

const currentSession = { initialized: false, session: {} };

app.use(staticMiddleware);
app.use(bodyParser.json());

app.post('/account', (req, res) => {
  ig.getAccountByName(req.body.username, currentSession.session)
    .then((result) => {
      ig.getAccountById(result._params.id, currentSession.session)
        .then((idResult) => {
          res.json(idResult._params);
        })
    })
})

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

app.get('/rate-experiment', (req, res) => {
  let counter = 1;
  console.log('hello catie');
  rateTestIds.map(id => {
    ig.getAccountById(id, currentSession.session)
      .then(detail => {
        console.log(counter);
        console.log(new Date());
        counter++;
      })
  })
})

app.post('/followers', (req, res) => {
  const followerDetails = [];
  ig.getFollowers(req.body.userId, currentSession.session)
    .then((result) => {
      result.map((profile) => {
        ig.getAccountById(profile.id, currentSession.session)
          .then((detail) => {
            console.log(detail._params);
          })
      })
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
