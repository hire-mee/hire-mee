import React from 'react';
import axios from 'axios';

// import MapContainer from './components/Map/Map.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Statistics from './components/Statistics/Statistics.jsx';
import { Briefcase, GraphUp, Trophy, GeoAlt, PersonFill, GearFill, PauseFill, ArrowClockwise, BoxArrowRight} from 'react-bootstrap-icons';

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
        <div className="grid-container">
          <div className="Nav">
            <div className="company_name">Hire-Mee</div>
            <div className="Dashboard">
              <div className="category_title">Dashboard</div>
              <div className="category"><Briefcase color="white" /> Jobs</div>
              <div className="category"><GraphUp color="white" /> Statistics</div>
              <div className="category"><Trophy color="white" /> Leaderboard</div>
              <div className="category"><GeoAlt color="white" /> Map</div>
              <div className="category"><PersonFill color="white" /> Friends</div>
            </div>
            <div className="Account">
              <div className="category_title">Account</div>
              <div className="category"><GearFill color="white" /> Settings</div>
              <div className="category"><PauseFill color="white" /> Pause</div>
              <div className="category"><ArrowClockwise color="white" /> Reset Week</div>
              <div className="category"><BoxArrowRight color="white" /> Logout</div>
            </div>
          </div>
          <div className="Header">
            <div className="Header-title">TITLE</div>
            <div className="Profile-area">PROFILE AREA</div>
          </div>
          <div className="Display">{this.componentHandler()}</div>
        </div>
      </div>
    );
  }
}

export default App;
