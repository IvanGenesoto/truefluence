const React = require('react');
const store = require('./store');
const http = require('http');
var request = require('request');
const https = require('https');


const UsernameInput = props => {
  const { text } = props;
  const handleChange = event => {
    store.dispatch({
      type: 'INPUT_CHANGED',
      text: event.target.value
    });
  };

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
    <div className='four column centered row'>
      <div className='ui action input'>
          <input
            type='text'
            placeholder='IG Username'
            onChange={ handleChange }
            ></input>
          <button
            className='ui button column'
            onClick={ handleSubmit }>Search</button>
      </div>
    </div>
  );
}
      
module.exports = UsernameInput;
