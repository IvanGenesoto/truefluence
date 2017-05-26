const https = require('https');
const ParseScrape = require('./parse-scrape');

function Scraper(username) {
    return new Promise((resolve, reject) => {
        https.get('https://www.instagram.com/' + username + '/?__a=1', (res) => {
            // console.log('statusCode:', res.statusCode);
            // console.log('headers:', res.headers);

            var dataQueue = '';

            res.on('data', (d) => {
                // process.stdout.write(d);
                dataQueue += d;
            });

            res.on('uncaughtException', function (err) {
                reject(err);
            });

            res.on('end', () => {
                var dataJSON = JSON.parse(dataQueue);
                const { user, medias } = ParseScrape(dataJSON);
                resolve({user: user, medias: medias});
            })
        }).on('error', (err) => {
            reject(err);
        });
    })
}

module.exports = Scraper;