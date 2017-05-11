const Client = require('instagram-private-api').V1;
const device = new Client.Device('eatifyjohn');
const path = require('path');
const cookiePath = path.join(__dirname, '/cookies/eatifyjohn.json');
const storage = new Client.CookieFileStorage(cookiePath);

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

IG.prototype.getAccountById = function (userId, session) {
  return new Promise((resolve, reject) => {
    new Client.Account.getById(session, userId)
    .then((result) => {
      resolve(result);
    });
  });
}

IG.prototype.getPosts = function(userId, sessions) {
  // return new Promise((resolve, reject) => {
  //   new Client.Feed.AccountFollowers(session, userId, 2000).get()
  //     .then((result) => {
  //       resolve(result);
  //     })
  // })
  new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
    .then((session) => {
      let feed = new Client.Feed.AccountFollowers(session, '2355406489', 2000);
      new Promise((resolve, reject) => {
        resolve(feed.get())
      })
        .then((results) => {
          console.log(results);
          console.log('number of results here: ' + results.length);
          return feed.get();
        })
        // .then((results) => {
        //   console.log(results);
        //   console.log('number of results here: ' + results.length);
        //   console.log('more available?' + feed.isMoreAvailable());
        //   return 'hotay';
        // })
    })
}

IG.prototype.initialize = function () {
  return new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
    .then((session) => {
      return session;
    })
}

module.exports = IG;
