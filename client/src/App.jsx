import React from 'react';
import axios from 'axios';

// import MapContainer from './components/Map/Map.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Login from './components/LogIn/Login.jsx';
import Statistics from './components/Statistics/Statistics.jsx';
import { Briefcase, GraphUp, Trophy, GeoAlt, PersonFill, GearFill, PauseFill, ArrowClockwise, BoxArrowRight} from 'react-bootstrap-icons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp: false,
      page: 'Log-in',
      users: '',
      currentUser: ''
    };
    this.componentHandler = this.componentHandler.bind(this);
    this.getData = this.getData.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  changeView(view) {
    this.setState({
      page: view
    })
  }


  componentHandler() {
    // if (this.state.page === 'Map') {
    //   return <MapContainer />;
    // }
    if (this.state.page === 'Statistics') {
      return <Statistics user={this.state.currentUser}/>
    } else if (this.state.page === 'Sign-up') {
      return <SignUp changeView={this.changeView}/>
    } else if (this.state.page === 'Log-in') {
      return <Login/>
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
    } else if (this.state.page === 'Log-in') {
      return (
        <div>
          <Login/>
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
