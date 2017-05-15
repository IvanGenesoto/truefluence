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
  // console.log(req.body.username);
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

// function buildFollowList(objTwitter) {
//   return new Promise((resolve, reject) => {
//     function cb(twit) {
//       console.log('term to query: ' + twit.queryTerms[twit.queryPos]);
//       twit.getSearch({ q: twit.queryTerms[twit.queryPos] })
//       .then((result) => {
//         var searchIds = [];
//         result.statuses.forEach((status) => {
//           if(!(status.user.following || status.user.follow_request_sent)) {
//               searchIds.push(status.user.id_str);
//             // }
//           }
//         })
//         return searchIds;
//       })
//       .then((searchIds) => {
//         database.getFollowedBy(twit.clientId)
//           .then((result) => {
//             var trimmedSearchIds = getUniqueIdsInA(searchIds, result);
//             twit.followList = twit.followList.concat(trimmedSearchIds);
//             console.log('follow list length: ' + twit.followList.length);
//             if(twit.followList.length > 59) {
//               resolve('gee');
//             } else {
//               twit.incrementQuery();
//               cb(twit);
//             }
//           })
//       })
//     }
//     cb(objTwitter);
//   })
// }

app.post('/media', (req, res) => {
  new Promise((resolve, reject) => {
    ig.getMedia(req.body.userId, currentSession.session)
      .then(result => {
        // console.log(result);
        // const likeRatio = result.length / (result.likeCount.reduce((tot, val) => {
        //   return tot + val;
        // }))
        // console.log('like ratio for user is: ', likeRatio);
        resolve(result);
      })

  })
    .then(list => {
      res.json(list);
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
  // buildProfileList(tempCSV)
  //   .then((result) => {
  //     console.log(result);
  //   })
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
  ig.getPosts(req.body.userId, currentSession.session)
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
