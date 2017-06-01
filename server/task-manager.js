// const Database = require('./database').Database;
// const database = new Database();
// const IG = require('./ig-main.js');
// const ig = new IG();
// const ParseScrape = require('./parse-scrape');
// const Scraper = require('./scraper');
// const async = require('async');
// const ScrapeBot = require('./scrape-bot');
// const scrapeBot = new ScrapeBot();
const TaskBot = require('./task-bot');
const taskBot = new TaskBot();


// const queueFollowers = (followers, primaryUserId, taskId) => {
//   console.log('queueFollowers activating!');
//   const timeNow = new Date(Date.now()).toISOString();
//   async.mapSeries(followers, (follower, next) => {
//     database.getUserByUsername(follower.username)
//       .then(result => {
//         if (result) {
//           console.log('old user, upserting relationship');
//           database.upsertRelationship(result.id, primaryUserId, true)
//             .then(related => {
//               next();
//             });
//         } else {
//           console.log('new user, inserting');
//           const profile = {
//             username: follower.username,
//             picture_url: follower.picture,
//             full_name: follower.fullName,
//             external_id: follower.id,
//             private: follower.isPrivate,
//             task_id: taskId
//           };
//           database.upsertUser(profile)
//             .then(newUser => {
//               database.upsertRelationship(newUser[0], primaryUserId, true)
//                 .then(related => {
//                   next();
//                 })
//             })
//         }
//       })
//   }, (err, dispatch) => {
//     // this is where it should dispatch that there are more tasks available.
//     // this should signal that if any bots are idle, to start looking again.
//     if (!err) {
//       controller.dispatch({
//         type: 'PROFILES_AVAILABLE'
//       });
//     }
//   })
// }

function TaskManager() {
  this.ready = true;
}

TaskManager.prototype.startTasks = function () {
  const that = this;
  that.ready = false;
  console.log('task manager says hi');
  taskBot.startTasks()
    .then(result => {
      that.ready = true;
    })
}

// TaskManager.prototype.startTask = function (taskId, session) { // FOR TEST PURPOSES ONLY
//   database.getTask(taskId)
//     .then(result => {
//       database.getUserById(result[0].primary_user_id)
//         .then(user => {
//           // console.log(user.external_id);
//           ig.getFollowers(user.external_id, session)
//             .then(followers => {
//               // console.log(followers);
//               queueFollowers(followers, result[0].primary_user_id, taskId);
//             })
//         })
//     })
//   // ig.getFollowers(req.body.userId, currentSession.session)
//   // .then((result) => {
//   //   console.log(result);
//   // })
// }

// TaskManager.prototype.assignQueue = function () {

// }

// TaskManager.prototype.startNextTask = function () {

// }

// TaskManager.prototype.assignTask = function () {

// }

module.exports = TaskManager;