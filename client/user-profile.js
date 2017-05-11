const React = require('react');
const store = require('./store');

const UserProfile = props => {
  const profile = store.getState().userProfile;
  console.log(profile.length);
  if (typeof profile.id == 'undefined') return null;
  const profileLink = 'http://www.instagram.com/' + profile.username;
  const handleGetFollowers = event => {
    event.preventDefault();
    let mioId = '231191164';
    fetch('/followers', {
      method: 'POST',
      headers: { 'Content-Type': 'applcation/json' },
      body: JSON.stringify({ userId: mioId })
    })
      .then((result) => {
        console.log(result);
      })
      // .then((result) => result.json())
      // .then((users) => {
      //   console.log(users);
      //   store.dispatch({
      //     type: 'SEARCH_COMPLETE',
      //     text: 'oh'
      //   })
      // })
  }
  return (
    <div>
      <div>
        <div>
          <a href={ profileLink }>
            <img className='ui small image' src={ profile.picture } />
          </a>
        </div>
        <div>
          <ul className="ui list">
            <li>User Name: { profile.username }</li>
            <li>User ID: { profile.id }</li>
            <li>Followers: { profile.followerCount }</li>
            <li>Posts: { profile.mediaCount }</li>
          </ul>
        </div>
      </div>
      <div>
        <p>{ profile.biography }</p>
        <button
          className='ui button'
          onClick={ handleGetFollowers }>Get List of Followers</button>
      </div>
    </div>
  );
}

module.exports = UserProfile;
