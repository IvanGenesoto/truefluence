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
    fetch('/rate-experiment');
  }
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
      // .then((result) => result.json())
      // .then((profiles) => {
      //   console.log(profiles);
      // })
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
        onClick = { handleExperiment }>Rate Experiment Test</button>
    </div>
  );
}

module.exports = UsernameInput;

