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

const followerList = (state = [], action) => {
  switch (action.type) {
    case 'HIDE_LIST':
      return {};
    case 'DISPLAY_LIST':
      return action.text;
    case 'SHOW_FOLLOWERS':
      console.log('action:', action);
      return action.followers;
    default:
      return state;
  }
}

const reducer = combineReducers({
  usernameInput,
  userProfile,
  followerList
});

const store = createStore(reducer);

module.exports = store;
