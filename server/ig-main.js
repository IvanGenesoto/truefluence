const Client = require('instagram-private-api').V1;
const device = new Client.Device('eatifyjohn');
const path = require('path');
const cookiePath = path.join(__dirname, '/cookies/eatifyjohn.json');
const storage = new Client.CookieFileStorage(cookiePath);

function IG() {

}

IG.prototype.getAccountByName = function(userName) {
  return new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
  .then((session) => {
    return new Promise((resolve, reject) => {
      new Client.Account.searchForUser(session, userName)
        .then((result) => {
          console.log(result);
          resolve(result);
        })
    })
  });
}

IG.prototype.getAccountById = function (userId) {
  new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
    .then((session) => {
      new Client.Account.getById(session, '654773758')
        .then((result) => {
          console.log(result);
        })
    })
}

IG.prototype.getPosts = function(userId) {

}

module.exports = IG;
