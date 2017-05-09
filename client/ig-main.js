var Client = require('instagram-private-api').V1;
var device = new Client.Device('eatifyjohn');
var storage = new Client.CookieFileStorage(__dirname + '/cookies/eatifyjohn.json');

function IG() {

}

IG.prototype.getAccount = function(userName) {
  return new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
  .then((session) => {
    new Promise((resolve, reject) => {
      resolve(Client.Account.searchForUser(session, userName));
    })
    .then((result) => {
      console.log(result);
      return result;
    });
  });
}

module.exports = IG;
