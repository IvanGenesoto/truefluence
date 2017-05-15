const React = require('react');
const store = require('./store');

const UserProfile = props => {
  const profile = store.getState().userProfile;
  console.log(profile.length);
  if (typeof profile.id == 'undefined') return null;
  const profileLink = 'http://www.instagram.com/' + profile.username;
  const handleGetFollowers = event => {
    event.preventDefault();
    fetch('/followers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: profile.id })
    })
      .then((result) => result.json())
      .then((users) => {
        console.log(users);
        store.dispatch({
          type: 'SEARCH_COMPLETE',
          text: 'oh'
        })
      })
  }
  const handleMedia = event => {
    console.log('handle media');
    fetch('/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: profile.id })
    })
      .then((result) => result.json())
      .then((posts) => {
        console.log('number of posts: ', posts.length);
        console.log('number of likes: ')
      })
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
        <button
          className='ui button'
          onClick={ handleMedia }>Get Post Details</button>
      </div>
    </div>
  );
}

module.exports = UserProfile;
