import React from 'react';
import axios from 'axios';

import MapContainer from './components/Map/Map.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Statistics from './components/Statistics/Statistics.jsx';
import { Briefcase, GraphUp, Trophy, GeoAlt, PersonFill, GearFill, PauseFill, ArrowClockwise, BoxArrowRight} from 'react-bootstrap-icons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp: false,
      pageTitle: 'Applications',
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
    // if (this.state.map === true) {
    //   return <MapContainer />
    // }
    if (this.state.page === 'Statistics') {
      return <Statistics user={this.state.currentUser}/>
    } else if (this.state.page === 'Sign-up') {
      return <SignUp/>
    } else if (this.state.page === 'map') {
      return <MapContainer />
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
    if (this.state.page === 'Sign-up')  {
      return (
        <div>
        <SignUp/>
        </div>
      )
    } else {
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
}

export default App;
