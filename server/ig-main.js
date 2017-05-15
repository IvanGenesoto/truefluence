const Client = require('instagram-private-api').V1;
const device = new Client.Device('eatifyjohn');
const path = require('path');
const cookiePath = path.join(__dirname, '/cookies/eatifyjohn.json');
const storage = new Client.CookieFileStorage(cookiePath);

const GLOBAL_INTERVAL = 100;

function IG() {

}

IG.prototype.getAccountByName = function(username, session) {
  return new Promise((resolve, reject) => {
    new Client.Account.searchForUser(session, username)
      .then((result) => {
        resolve(result);
      });
  });
}

// Feasible call rate: 115/min (~18 media per call)

IG.prototype.getPosts = function (userId, session) {
  const posts = [];
  let counter = 0;
  const startTime = new Date();
  return new Promise((resolve, reject) => {
    let feed = new Client.Feed.UserMedia(session, userId)
    function cb() {
      feed.get()
      .then(result => {
        counter++;
        result.map(post => { posts.push(post._params); });
        if (feed.isMoreAvailable()) {
          console.log('yes, more available');
          console.log(posts.length);
          console.log(counter);
          setTimeout(() => {
            cb();
          }, GLOBAL_INTERVAL);
        } else {
          const endTime = new Date();
          console.log('rate for this action (actions/minute):', counter/((endTime - startTime)/60000));
          resolve(posts);
        }
      })
    }
    cb();
  })
}

IG.prototype.getAccountById = function (userId, session) {
  return new Promise((resolve, reject) => {
    new Client.Account.getById(session, userId)
    .then((result) => {
      resolve(result);
    });
  });
}

IG.prototype.getFollowers = function(userId, sessions) {
  return new Promise((resolve, reject) => {
    new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
      .then((session) => {
        let feed = new Client.Feed.AccountFollowers(session, userId, 2000);
          feed.get()
            .then((results) => {
              resolve(results.map((result) => {
                return result._params;
              }))
            })
      })
  })
}

IG.prototype.initialize = function () {
  return new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
    .then((session) => {
      return session;
    })
}

module.exports = IG;
