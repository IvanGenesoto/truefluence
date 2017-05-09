var Client = require('instagram-private-api').V1;
var device = new Client.Device('eatifyjohn');
var storage = new Client.CookieFileStorage(__dirname + '/cookies/eatifyjohn.json');

const getAccount = userName => {
  return new Client.Session.create(device, storage, 'eatifyjohn', 'occsbootcamp')
  .then((session) => {
    new Promise((resolve, reject) => {
      resolve(Client.Account.searchForUser(session, '123chocula'));
    })
    .then((result) => {
      return result;
    });
  });
}

module.exports = getAccount;
