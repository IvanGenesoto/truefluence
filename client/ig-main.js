var Client = require('instagram-private-api').V1;
var device = new Client.Device('eatifyjohn');
var storage = new Client.CookieFileStorage(__dirname + '/cookies/eatifyjohn.json');
