const { createStore, combineReducers } = require('redux');
const https = require('https');
const usernameInput = (state = '', action) => {
  switch (action.type) {
    case 'INPUT_CHANGED':
      return action.text;
    case 'SEARCH_COMPLETE':
      return action.text;
    default:
      return state;
  }
}

const userProfile = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_PROFILE':
      return action.profile;
    default:
      return state;
  }
}

const reducer = combineReducers({
  usernameInput,
  userProfile
});

const store = createStore(reducer);
function fetcher() {
  https.get('https://www.instagram.com/tennishealthfitness/?__a=1', (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      process.stdout.write(d);
  });

  }).on('error', (e) => {
      console.error(e);
  });
}
module.exports = {
  store: store,
  fetcher: fetcher
};
