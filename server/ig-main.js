const Client = require('instagram-private-api').V1;
const device = new Client.Device('eatifyjohn');
const path = require('path');
const cookiePath = path.join(__dirname, '/cookies/eatifyjohn.json');
const storage = new Client.CookieFileStorage(cookiePath);

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
