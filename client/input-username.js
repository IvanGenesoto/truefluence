const React = require('react');
const { store, fetcher } = require('./store');
const http = require('http');
var request = require('request');
const https = require('https');

// const fetcher = () => {
//   https.get('https://www.instagram.com/tennishealthfitness/?__a=1', (res) => {
//     console.log('statusCode:', res.statusCode);
//     console.log('headers:', res.headers);

//     res.on('data', (d) => {
//       process.stdout.write(d);
//   });

//   }).on('error', (e) => {
//       console.error(e);
//   });
// }
fetcher();

const UsernameInput = props => {
  const { text } = props;
  const handleChange = event => {
    store.dispatch({
      type: 'INPUT_CHANGED',
      text: event.target.value
    });
  };
  const handleExperiment = event => {
    // var fetcher = require('node-fetch');
    // fetcher();
    // fetcher('https://www.instagram.com/tennishealthfitness/?__a=1').then(function(response) {
    //     // Convert to JSON
    //     return response.json();
    // }).then(function(j) {
    //     // Yay, `j` is a JavaScript object
    //     console.log(j);
    // });
    // https.get('https://www.instagram.com/tennishealthfitness/?__a=1', (res) => {
    //     console.log('statusCode:', res.statusCode);
    // console.log('headers:', res.headers);

    // res.on('data', (d) => {
    //     process.stdout.write(d);
    // });

    // }).on('error', (e) => {
    //     console.error(e);
    // });
    // var experimentRequest = new Request('https://www.instagram.com/eatify/?__a=1');

    // fetch(experimentRequest, {
    //   method: 'GET',
    //   headers: { 
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })
    //   // .then(result => result.json())
    //   // .then(scrape => {
    //   //   console.log(scrape);
    //   // })
    //   .then(result => {
    //     console.log(result);
    //   })
    // var options = {
    //   url: 'http://cors.io/?https://www.instagram.com/eatify/?__a=1',
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'multipart/form-data'
    //   }
    // };

    // request(options, (err, res, body) => {
    //   if (!err) {
    //     console.log(body);
    //   }
    // });
    // Browser.localhost('instagram.com', 3000);
    // const browser = new Browser();
    // browser.visit('https://www.instagram.com/eatify/?__a=1', function() {
    //   console.log(browser.location.href);
    // });
    // var options = {
    //   host: 'www.instagram.com',
    //   path: '/eatify/?__a=1'
    // };

    // callback = function(response) {
    //   var str = '';

    //   //another chunk of data has been recieved, so append it to `str`
    //   response.on('data', function (chunk) {
    //     str += chunk;
    //   });

    //   //the whole response has been recieved, so we just print it out here
    //   response.on('end', function () {
    //     console.log(str);
    //   });
    // }

    // http.request(options, callback).end();
  }
      //   mode: 'no-cors'
      // headers: { 
      //   'Access-Control-Allow-Origin': '*'
      //   'Content-Type': 'multipart/form-data'
      // }

      // request
      //   .get('https://www.instagram.com/eatify/?__a=1')
      //   .on('response', function(response) {
      //     console.log(response);
      //   })


  const handleSubmit = event => {
    event.preventDefault();
    const username = store.getState().usernameInput;
    fetch('/account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username })
    })
      .then((result) => result.json())
      .then(user => {
        console.log(user);
        store.dispatch({
          type: 'SAVE_PROFILE',
          profile: user
        });
      })
  };
  const handleCSV = event => {
    fetch('/csv')
  }
  return (
    <div className='column'>
      <div className='ui action input'>
        <input
          type='text'
          placeholder='IG Username'
          onChange={ handleChange }
          ></input>
        <button
          className='ui button'
          onClick={ handleSubmit }>Search</button>
      </div>
      <button
        className='ui button'
        onClick = { handleCSV }>Load from CSV</button>
      <button
        className='ui button'
        onClick = { handleExperiment }>Scraping Experiment</button>
    </div>
  );
}

module.exports = UsernameInput;
