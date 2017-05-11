const React = require('react');
const store = require('./store');

const UserProfile = props => {
  const profile = store.getState().userProfile;
  console.log(profile.length);
  if (typeof profile.id == 'undefined') return null;
  const profileLink = 'http://www.instagram.com/' + profile.username;
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
      </div>
    </div>
  );
}

module.exports = UserProfile;

// { username: '123chocula',
//   picture: 'http://scontent.cdninstagram.com/t51.2885-19/12230863_691359027630917_506377473_a.jpg',
//   fullName: '',
//   id: 52139312,
//   isPrivate: false,
//   hasAnonymousProfilePicture: false,
//   isBusiness: false,
//   usertagsCount: 24,
//   followingCount: 103,
//   followerCount: 111,
//   biography: '',
//   mediaCount: 34,
//   externalUrl: '' },
// id: 52139312 }
