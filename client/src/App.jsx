import React from 'react';
import axios from 'axios';

import MapContainer from './components/Map/Map.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Statistics from './components/Statistics/Statistics.jsx';
import { Briefcase, GraphUp, Trophy, GeoAlt, PersonFill, GearFill, PauseFill, ArrowClockwise, BoxArrowRight } from 'react-bootstrap-icons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      page: 'Statistics',
      users: '',
      currentUser: ''
    };
    this.componentHandler = this.componentHandler.bind(this);
    this.componentStartUp = this.componentStartUp.bind(this);
    this.getData = this.getData.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentStartUp() {
    if (this.state.loggedIn === false) {
      return <SignUp />
    } else {
      return (
        <div>
          <div className="grid-container">
            <div className="Nav">
              <div className="company_name">Hire-Mee</div>
              <div className="Dashboard">
                <div className="category_title">Dashboard</div>
                <div className="category" data-letter="Jobs" onClick={this.changePage}><Briefcase color="white" /> Jobs</div>
                <div className="category" data-letter="Statistics" onClick={this.changePage}><GraphUp color="white" /> Statistics</div>
                <div className="category" data-letter="Leaderboard" onClick={this.changePage}><Trophy color="white" /> Leaderboard</div>
                <div className="category" data-letter="Map" onClick={this.changePage}><GeoAlt color="white" /> Map</div>
                <div className="category" data-letter="Friends" onClick={this.changePage}><PersonFill color="white" /> Friends</div>
              </div>
              <div className="Account">
                <div className="category_title">Account</div>
                <div className="category" data-letter="Settings" onClick={this.changePage}><GearFill color="white" /> Settings</div>
                <div className="category" data-letter="Pause" onClick={this.changePage}><PauseFill color="white" /> Pause</div>
                <div className="category" data-letter="Reset" onClick={this.changePage}><ArrowClockwise color="white" /> Reset Week</div>
                <div className="category" data-letter="Logout" onClick={this.changePage}><BoxArrowRight color="white" /> Logout</div>
              </div>
            </div>
            <div className="Header">
              <div className="Header-title">{this.state.page}</div>
              <div className="Profile-area">PROFILE AREA</div>
            </div>
            <div className="Display">{this.componentHandler()}</div>
          </div>
        </div>
      )
    }
  }

  componentHandler() {
    if (this.state.loggedIn === true) {
      if (this.state.page === 'Jobs') {

      } else if (this.state.page === 'Statistics') {
        return <Statistics user={this.state.currentUser} />
      } else if (this.state.page === 'Leaderboard') {

      } else if (this.state.page === 'Map') {
        return <MapContainer />
      } else if (this.state.page === 'Settings') {

      } else if (this.state.page === 'Logout') {
        return this.dummyFunction()
      }
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

  changePage(e) {
    this.setState({
      page: e.target.dataset.letter
    })
  }

  dummyFunction() {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

  render() {
    console.log(`Current Page: `, this.state.page)
    return (
      <div>
        <div className="StartUp">
          {this.componentStartUp()}
          <button onClick={this.dummyFunction.bind(this)}>LOGGED IN</button>
        </div>
      </div>
    );
  }
}

export default App;
