import React from 'react';
import MapContainer from './components/Map/Map.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import '../dist/mapStyles.css'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signUp: false,
      map: true,
      pageTitle: 'Applications'
    };
    this.componentHandler = this.componentHandler.bind(this);
  }

  componentHandler() {
    if (this.state.map === true) {
      return <MapContainer />
    }
  }

  render() {
    return (
      <div className="mainWindow">
        <div className="navbar">
          <div className="title">Hire-Mee</div>
          <div className="dashboard">
            <div className="applications">Applications</div>
            <div className="statistics">Statistics</div>
            <div className="leaderboard">Leaderboard</div>
            <div className="map">Map</div>
            <div className="friends">Friends</div>
          </div>
          <div className="account">
            <div className="settings">Settings</div>
            <div className="pause">Pause</div>
            <div className="resetWeek">Reset Week</div>
            <div className="logout">Logout</div>
          </div>
        </div>
        <div className="dashBoardDisplay">{this.componentHandler()}</div>
      </div>
    );
  }
}

export default App;
