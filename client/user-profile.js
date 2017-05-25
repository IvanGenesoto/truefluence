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
      .then((followers) => {
        console.log('number of followers:', followers.length);

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
        const likes = posts.map((post) => { return post.likeCount; }).reduce((tot, val) => { return tot + val; });
        const comments = posts.map((post) => { return post.commentCount; }).reduce((tot, val) => { return tot + val; });
        console.log('number of posts:', posts.length);
        console.log('number of likes:', likes);
        console.log('likes per post:', likes/posts.length);
        console.log('number of comments:', comments);
        console.log('comments per post:', comments/posts.length);
        console.log('like ratio:', likes/profile.followerCount);
      })
  }
  const handleGather = event => {
    console.log('handle gather');
    fetch('/gather', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: profile.username })
    })
    .then((result) => result.json())
    .then((user) => {
      console.log(user);
    })
  }
  return (
    <div className='ten column centered row'>
      <div>
        <div>
          <a href={ profileLink }>
            <img className='ui small image centered column' src={ profile.picture } />
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
        <button
          className='ui button'
          onClick={ handleGather }>Gather User</button>
      </div>
    </div>
  );
}

module.exports = UserProfile;
