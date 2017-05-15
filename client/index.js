const React = require('react');
const ReactDOM = require('react-dom');
const store = require('./store');

const UsernameInput = require('./input-username');
const UserProfile = require('./user-profile');
// const PostDetails = require('./post-details');

const render = () => {
  const state = store.getState();
  ReactDOM.render(
    <div className='ui middle aligned center aligned grid'>
      <UsernameInput text={ state.usernameInput } />
      <div>
        <UserProfile { ...state.userProfile }></UserProfile>
      </div>
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

function createProfilesFromCSV(csvData) {
  var importProfiles = [];
  var propertyNames = csvData[0];

  for (var i = 1; i < csvData.length; i++) {
    var tempProfile = new lead();
    for (var j = 0; j < csvData[i].length; j++) {
      tempLead[csvData[0][j]].field = csvData[i][j];
    }
    tempLead = assignNewId(tempLead);
    importLeads.push(tempLead);
  }
  return importLeads;
}

store.subscribe(render);

render();
