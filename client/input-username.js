const React = require('react');
const store = require('./store');
const IG = require('./ig-main');

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
    let userName = store.getState().usernameInput;
    store.dispatch({
      type: 'START_SEARCH',
      text: userName
    });
    const account = IG.getAccount(userName);
    console.log('now for the account!');
    console.log(account);
  };
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
    </div>
  );
}

module.exports = UsernameInput;
