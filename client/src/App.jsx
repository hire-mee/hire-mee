import React from 'react';
import axios from 'axios';

// import MapContainer from './components/Map/Map.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Statistics from './components/Statistics/Statistics.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signUp: false,
      page: 'Statistics',
      users: '',
      currentUser: ''
    };
    this.componentHandler = this.componentHandler.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentHandler() {
    // if (this.state.page === 'Map') {
    //   return <MapContainer />;
    // }
    if (this.state.page === 'Statistics') {
      return <Statistics user={this.state.currentUser}/>
    }
  }

  getData() {
    axios
    .get('/api/users')
    .then(data => {
      this.setState({
        users: data.data,
        currentUser: data.data[0]
      })
    })
    .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
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
        <div>{this.componentHandler()}</div>
      </div>
    );
  }
}

export default App;
