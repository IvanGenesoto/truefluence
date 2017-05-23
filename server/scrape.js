const https = require('https');
function Scraper(username) {
    https.get('https://www.instagram.com/' + username + '/?__a=1', (res) => {
        // console.log('statusCode:', res.statusCode);
        // console.log('headers:', res.headers);

        var dataQueue = '';

        res.on('data', (d) => {
            // process.stdout.write(d);
            dataQueue += d;
        });

        res.on('end', () => {
            var dataJSON = JSON.parse(dataQueue);
            const { user, medias } = ParseScrape(dataJSON);
        })
    }).on('error', (e) => {
        console.error(e);
    });
}

module.exports = Scraper;