const { createStore, combineReducers } = require('redux');

const usernameInput = (state = '', action) => {
  switch (action.type) {
    case 'INPUT_CHANGED':
      return action.text;
    case 'START_SEARCH':
      console.log('now searching: ', action.text);
      return action.text;
    default:
      return state;
  }
}

const reducer = combineReducers({
  usernameInput
});

const store = createStore(reducer);

module.exports = store;
