var Client = require('instagram-private-api').V1;
var device = new Client.Device('eatifyjohn');
var storage = new Client.CookieFileStorage(__dirname + '/cookies/eatifyjohn.json');

// login

// FOLLOW USER

// var thisSession = new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
//   .then((session) => {
//     return [session, Client.Account.searchForUser(session, '123chocula')];
//   })
//   .spread((session, account) => {
//     return Client.Relationship.create(session, account.id);
//   })
//   .then((relationship) => {
//     console.log(relationship.params);
//   })

// var mediaId = '12826325_516795188520863_1004712221';
// return new Request(session)
//   .setMethod('POST')
//   .setResource('like', {id: mediaId})
//   .generateUUID()
//   .setData({
//     media_id: mediaId,
//     src: 'profile'
//   })
//   .signPayload()
//   .send()
//   .then((data) => {
//     return new Like(session, {});
//   })


// Get media, followers, and likes per media. Get average. Quartiles

// last X posts. or last X days.
// var thisSession = new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
//   .then((session) => {
//     console.log(session);
//     var followers = Client.Feed.AccountFollowers(session, '123chocula', 1000);
//     // console.log(Client.Feed.AccountFollowers.get());
//     console.log(followers);
//

// GET FOLLOWERS OF PROFILE

// new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
//   .then((session) => {
//     let feed = new Client.Feed.AccountFollowers(session, '2355406489', 2000);
//     new Promise((resolve, reject) => {
//       resolve(feed.get())
//     })
//       .then((results) => {
//         console.log(results);
//         console.log('number of results here: ' + results.length);
//         return feed.get();
//       })
//       .then((results) => {
//         console.log(results);
//         console.log('number of results here: ' + results.length);
//         console.log('more available?' + feed.isMoreAvailable());
//         return 'hotay';
//       })
//   })

// new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
//   .then((session) => {
//     let feed = new Client.Feed.AccountFollowers(session, '2355406489');
//     new Promise((resolve, reject) => {
//       resolve(feed.get())
//     })
//       .then((results) => {
//         console.log(results);
//         return feed.get();
//       })
//       .then((results) => {
//         console.log(results);
//       })
//   })

//  GET DEETS ON posts

// new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
//   .then((session) => {
//     // let media = new Client.Media.getById(session, '1429142236834953137_2355406489');
//     new Promise((resolve, reject) => {
//       resolve(new Client.Media.getById(session, '1429142236834953137_2355406489'));
//     })
//       .then((result) => {
//         console.log(result);
//       })
//   })

// SEND PRIVATE MESSAGE

// new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
//   .then((session) => {
//     let thread = new Client.Thread.configureText(session, '52139312', 'sent via API')
//       .then((t) => {
//         console.log(t);
//       })
//   })

// GET LIST OF MEDIA FROM accountId

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

// GET LIST OF MEDIA LIKERS

new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
  .then((session) => {
    // let media = new Client.Media.getById(session, '1429142236834953137_2355406489');
    new Promise((resolve, reject) => {
      resolve(new Client.Media.likers(session, '1361622370787578745_654773758'));
    })
      .then((result) => {
        console.log(result);
        console.log('number: ' + result.length);
      })
  })
