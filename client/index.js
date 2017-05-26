const React = require('react');
const ReactDOM = require('react-dom');
const store = require('./store');
const UsernameInput = require('./input-username');
const UserProfile = require('./user-profile');
const PostDetails = require('./post-details');
const FollowerList = require('./follower-list.js');

const render = () => {
  const state = store.getState();
  ReactDOM.render(
    <div className='ui grid'>
      <UsernameInput text={ state.usernameInput } />
      <UserProfile { ...state.userProfile }></UserProfile>
      <FollowerList { ...state.followerList }></FollowerList>
    </div>,
    document.querySelector('#container')
  )
}


function profile(userName, userId, followers, pictureLink) {
  this.userName = userName;
  this.userId = userId;
  this.followers = followers;
  this.pictureLink = pictureLink;
}

store.subscribe(render);

render();
