const React = require('react');
const store = require('./store');


const UsernameInput = props => {
  const { text } = props;
  const handleChange = event => {
    store.dispatch({
      type: 'INPUT_CHANGED',
      text: event.target.value
    });
  };
  const handleExperiment = event => {
    var experimentRequest = new Request('https://www.instagram.com/eatify/?__a=1');

    fetch(experimentRequest, {
      method: 'GET'
    })
      // .then(result => result.json())
      // .then(scrape => {
      //   console.log(scrape);
      // })
      .then(result => {
        console.log(result);
      })
  }
      //   mode: 'no-cors'
      // headers: { 
      //   'Access-Control-Allow-Origin': '*'
      //   'Content-Type': 'multipart/form-data'
      // }
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
