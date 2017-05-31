const React = require('react');
const store = require('./store');
// const Database = require('./../server/database').Database;
// const database = new Database();
const async = require('async');

const addMediasStats = followers => {
  return new Promise((resolve, reject) => {
    async.mapSeries(followers, (follower, next) => {
      fetch('/media-stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: follower.external_id })
      })
          .then(result => result.json())
          .then(medias => {
              follower.private = medias.private;
              follower.avLikes = medias.avLikes;
              follower.avComments = medias.avComments;
              next();
          })
    }, (err, details) => {
      resolve(followers);
    })
  })
}

const UserProfile = props => {
  const profile = store.getState().userProfile;
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
      })
  }

  const handleAnalyze = event => {
    console.log('handle analyze');
    store.dispatch({
      type: 'HIDE_LIST'
    });
    store.dispatch({
      type: 'SHOW_LOADER'
    });
    fetch('/gather', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: profile.username })
    })
      .then(result => result.json())
      .then(followers => {
        addMediasStats(followers)
          .then(statsFollowers => {
            store.dispatch({
              type: 'HIDE_LOADER'
            });
            store.dispatch({
              type: 'SHOW_FOLLOWERS',
              followers: statsFollowers
            })

          })
        // database.topFollowed(result)
      })
  }
  return (
    <div className='ui eight column centered row'>
      <div>
        <div>
          <a href={ profileLink }>
            <img className='ui small image centered column' src={ profile.picture_url } />
          </a>
        </div>
        <div>
          <ul className="ui list">
            <li>User Name: { profile.username }</li>
            <li>User ID: { profile.external_id }</li>
            <li>Followers: { profile.follower_count }</li>
            <li>Posts: { profile.post_count }</li>
          </ul>
        </div>
      </div>
      <div className='ui four column centered row'>
        <p>{ profile.bio }</p>
        <button
          className='ui button'
          onClick={ handleAnalyze }>Analyze Followers</button>
      </div>
    </div>
  );
}

module.exports = UserProfile;
