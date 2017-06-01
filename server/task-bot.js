const IG = require('./ig-main.js');
const ig = new IG();
const Database = require('./database').Database;
const database = new Database();
const async = require('async');
const controllert = require('./bot-controller');
const currentSession = { initialized: false, session: {} };

ig.initialize()
  .then((session) => {
    currentSession.session = session;
  });

const queueFollowers = (followers, primaryUserId, taskId) => {
  console.log('queueFollowers activating!');
  const timeNow = new Date(Date.now()).toISOString();
  return new Promise((resolve, reject) => {
    async.mapSeries(followers, (follower, next) => {
      database.getUserByUsername(follower.username)
        .then(result => {
          if (result) {
            console.log('old user, upserting relationship primary:', primaryUserId);
            database.upsertRelationship(result.id, primaryUserId, true)
              .then(related => {
                next();
              });
          } else {
            console.log('new user, inserting');
            const profile = {
              username: follower.username,
              picture_url: follower.picture,
              full_name: follower.fullName,
              external_id: follower.id,
              private: follower.isPrivate,
              task_id: taskId
            };
            database.upsertUser(profile)
              .then(newUser => {
                console.log('newUser[0]', newUser[0]);
                console.log('primary id:', primaryUserId);
                database.upsertRelationship(newUser[0], primaryUserId, true)
                  .then(related => {
                    next();
                  })
              })
          }
        })
    }, (err, dat) => {
      if (!err) {
        controllert.dispatch({
          type: 'PROFILES_AVAILABLE'
        })
        resolve('complete');
      } else {
        reject(err);
      }
    })
  })
}

function TaskBot() {
  this.ready = true;
}

TaskBot.prototype.startTasks = function () { // FOR TEST PURPOSES ONLY
  const that = this;
  that.ready = false;
  return new Promise((resolve, reject) => {
    function processTask() {
      database.getNextTask()
        .then(result => {
          if (result[0]) {
            console.log('result[0] from get next task:', result[0]);
            const userId = result[0].primary_user_id;
            const taskId = result[0].id;
            database.getUserById(userId)
              .then(user => {
                // console.log(user.external_id);
                ig.getFollowers(user.external_id, currentSession.session)
                  .then(followers => {
                    queueFollowers(followers, userId, taskId)
                      .then(final => {
                        database.updateTask(taskId, { follower_list_complete: true })
                          .then(complete => {
                            processTask();
                          })
                      })
                  })
              })
          } else {
            that.ready = true;
            resolve('done');
          }
        }) 
    }
    processTask();
  })
}

module.exports = TaskBot;