import React from 'react';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log('profile area', this.props);
    return (
      <div>
        <div className="userProfileContainer">
          <div className="userAvatar"><img className="userAvatar" src="https://www.w3schools.com/howto/img_avatar.png"></img></div>
          {}
          <div className="userProfileData">
            {this.props.userData.firstname}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
