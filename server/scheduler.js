const IG = require('./ig-main.js');
const ig = new IG();

var currentSession = { initialized: false, session: {} };

// ig.initialize()
//   .then((session) => {
//     currentSession.session = session;
//     chainExperiment(100, 1, dateNow);
//   });


// const chainActions = (funcToRepeat, interval, batchName) => {
//
// }
//
// const MasterScheduler = () => {
//
// }
//
// const chainGetPosts = (userId, interval) => {
//
// }

// In order to chain a function,

const chainExperiment = (interval, counter, startTime) => {
  function cb(interval, counter, startTime) {
    const dateNow = new Date();
    ig.getAccountByName('shoenicee', currentSession.session)
      .then((result) => {
        console.log(result._params.username);
        console.log('Interval: ' + interval + ' this iteration: ' + counter + ' duration: ' + (dateNow - startTime));
        setTimeout(() => {
          cb(interval, counter + 1, startTime)
        }, interval);
      })
      .catch((err) => {
        console.log(err);
        console.log('error at interval: ' + interval + ' this iteration: ' + counter + ' duration: ' + (dateNow - startTime));
      })
  }
  cb(interval, counter, startTime);
}

function Scheduler() {

}

Scheduler.prototype.getPosts = function (interval, userId, session) {
  const posts = [];
  function cb() {
    ig.getPosts(userId, session)
  }
  cb()
}
