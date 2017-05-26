const Client = require('instagram-private-api').V1;
const device = new Client.Device('eatifyjohn');
const path = require('path');
const cookiePath = path.join(__dirname, '/cookies/eatifyjohn.json');
const storage = new Client.CookieFileStorage(cookiePath);

const GLOBAL_INTERVAL = 500;

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

// Feasible call rate: ~115/min (~12 media per call so roughly 1,400 posts per minute)

IG.prototype.getPosts = function (userId, session) {
  const posts = [];
  let counter = 0;
  const startTime = new Date();
  return new Promise((resolve, reject) => {
    let feed = new Client.Feed.UserMedia(session, userId)
    function retrieve() {
      feed.get()
      .then(result => {
        counter++;
        result.map(post => { posts.push(post._params); });
        if (feed.isMoreAvailable()) {
          console.log('yes, more available');
          console.log(posts.length);
          console.log(counter);
          setTimeout(() => {
            retrieve();
          }, GLOBAL_INTERVAL);
        } else {
          const endTime = new Date();
          console.log('rate for this action (actions/minute):', counter/((endTime - startTime)/60000));
          resolve(posts);
        }
      })
    }
    retrieve();
  })
}

IG.prototype.processFollowers = function (userId, session, followerIds) {
  return new Promise((resolve, reject) => {
  })
}

// Feasible call rate: ~18/min (~196 followers per call so roughly 3,544 followers per minute)

IG.prototype.getAccountById = function (userId, session) {
  return new Promise((resolve, reject) => {
    new Client.Account.getById(session, userId)
    .then((result) => {
      resolve(result);
    });
  });
}

IG.prototype.getFollowers = function(userId, session) {
  const followers = [];
  let counter = 0;
  const startTime = new Date();
  return new Promise((resolve, reject) => {
    let feed = new Client.Feed.AccountFollowers(session, userId, 1000);
    function retrieve() {
      feed.get()
        .then((result) => {
          // counter++;
          result.map(user => { followers.push(user._params); });
          // if (feed.isMoreAvailable()) {
          //   console.log('yes, more available');
          //   console.log(followers.length);
          //   console.log(counter);
          //   setTimeout(() => {
          //     retrieve();
          //   }, GLOBAL_INTERVAL);
          // } else {
          //   const endTime = new Date();
          //   console.log('rate for this action (actions/minute):', counter/((endTime - startTime)/60000));
          //   resolve(followers);
          // }
          resolve(followers);
        })
    }
    retrieve();
  })
}

IG.prototype.initialize = function () {
  return new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
    .then((session) => {
      return session;
    })
}

module.exports = IG;
