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
// new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
//   .then((session) => {
//     let feed = new Client.Feed.UserMedia(session, '654773758', 1000);
//     new Promise((resolve, reject) => {
//       resolve(feed.get())
//     })
//       .then((results) => {
//         console.log('number of media: ' + results.length);
//         console.log(results);
//         // let totalLikes = results.reduce()
//         return feed.get();
//       })
//       .then((results) => {
//         console.log(results);
//         return feed.get();
//       })
//       .then((results) => {
//         console.log(results);
//         return 'lol';
//       })
//   })

IG.prototype.getMedia = function (userId, session) {
  return new Promise((resolve, reject) => {
    let feed = new Client.Feed.UserMedia(session, userId, 30)
      feed.get()
        .then(result => {
          console.log(result.map(single => { console.log(single._params.likeCount) }));
          // const likeRatio = result.length / (result._params.likeCount.reduce((tot, val) => {
          //   return tot + val;
          // }))
          // console.log('like ratio for user is: ', likeRatio);
          resolve(result.map(post => { return post._params; }));
        })
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

IG.prototype.getPosts = function(userId, sessions) {
  // return new Promise((resolve, reject) => {
  //   new Client.Feed.AccountFollowers(session, userId, 2000).get()
  //     .then((result) => {
  //       resolve(result);
  //     })
  // })
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

