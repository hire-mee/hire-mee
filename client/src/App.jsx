import React from 'react';
import axios from 'axios';

// import MapContainer from './components/Map/Map.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Login from './components/LogIn/Login.jsx';
import Statistics from './components/Statistics/Statistics.jsx';
import { Briefcase, GraphUp, Trophy, GeoAlt, PersonFill, GearFill, PauseFill, ArrowClockwise, BoxArrowRight } from 'react-bootstrap-icons';
import Jobs from './components/jobs/Jobs.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'Signup',
      userId: '',
      users: '',
      currentUser: '',
      appliedJobs:[{positionTitle: "Full Stack WebDeveloper",companyName: "Google", salary: 150000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"https://www.google.com/",descr:"not real" },{positionTitle: "Front End WebDeveloper",companyName: "Facebook", salary: 100000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"https://www.google.com/",descr:"not real" },{positionTitle: "Back End WebDeveloper",companyName: "Amazon", salary: 120000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"https://www.google.com/",descr:"not real" }],

      rejected: [{positionTitle: "Full Stack WebDeveloper",companyName: "Google", salary: 150000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"https://www.google.com/",descr:"not real" },{positionTitle: "Front End WebDeveloper",companyName: "Facebook", salary: 100000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"https://www.google.com/",descr:"not real" }],

      offered: [{positionTitle: "Full Stack Web Developer",companyName: "Amazon", salary: 150000, submitDate: "06/05/2020",  deadLine: "06/19/2020",loc:"Los Angeles, Ca", urlLink:"https://www.google.com/",descr:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }],

      desired: 120000,
 
    };
    this.componentHandler = this.componentHandler.bind(this);
    this.componentStartUp = this.componentStartUp.bind(this);
    this.getData = this.getData.bind(this);
    this.changePage = this.changePage.bind(this);
    this.storeUserData = this.storeUserData.bind(this);
  }

  componentDidMount() {
    // this.getData();
  }

  componentStartUp() {
    if (this.state.page === 'Signup') {
      return <SignUp changePage={this.changePage}/>
    } else if (this.state.page === 'Login') {
      return <Login 
      changePage={this.changePage}
      storeUserData={this.storeUserData}/>
    } else {
      return (
        <div>
          <div className="grid-container">
            <div className="Nav">
              <div className="company_name">Hire-Mee</div>
              <div className="Dashboard">
                <div className="category_title">Dashboard</div>
                <div className="category" data-letter="Jobs" onClick={() => this.changePage('Jobs')}><Briefcase color="white" /> Jobs</div>
                <div className="category" data-letter="Statistics" onClick={() => this.changePage('Statistics')}><GraphUp color="white" /> Statistics</div>
                <div className="category" data-letter="Leaderboard" onClick={() => this.changePage('Leaderboard')}><Trophy color="white" /> Leaderboard</div>
                <div className="category" data-letter="Map" onClick={() => this.changePage('Map')}><GeoAlt color="white" /> Map</div>
                <div className="category" data-letter="Friends" onClick={() => this.changePage('Friends')}><PersonFill color="white" /> Friends</div>
              </div>
              <div className="Account">
                <div className="category_title">Account</div>
                <div className="category" data-letter="Settings" onClick={() => this.changePage('Settings')}><GearFill color="white" /> Settings</div>
                <div className="category" data-letter="Pause" onClick={() => this.changePage('Pause')}><PauseFill color="white" /> Pause</div>
                <div className="category" data-letter="Reset" onClick={() => this.changePage('Reset')}><ArrowClockwise color="white" /> Reset Week</div>
                <div className="category" data-letter="Signup" onClick={() => this.changePage('Signup')}><BoxArrowRight color="white" /> Logout</div>
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
      if (this.state.page === 'Jobs') {
        return <Jobs applied={this.state.appliedJobs} desired={this.state.desired} offered={this.state.offered} rejected={this.state.rejected}/>
      } else if (this.state.page === 'Statistics') {
        return <Statistics user={this.state.currentUser} />
      } else if (this.state.page === 'Leaderboard') {

      } else if (this.state.page === 'Map') {
        // return <MapContainer />
      } else if (this.state.page === 'Settings') {

      }
  }

  storeUserData(data) {
    this.setState({
      currentUser: data
    }, () => console.log(this.state.currentUser))
  }


  getData() {
    axios
      .get(`/api/user/${this.state.userId}`)
      .then(data => {
        this.setState({
          users: data.data,
          currentUser: data.data[0],
        }, () => console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', this.state.currentUser))
      })
      .catch(err => console.error(err))
  }

  changePage(page) {
    this.setState({
      page: page
    })
  }

  render() {
    console.log(`Current Page: `, this.state.page)
    return (
      <div>
        <div className="StartUp">
          {this.componentStartUp()}
          <button onClick={() => this.changePage('Jobs')}>LOGGED IN</button>
        </div>
      </div>
    );
  }
}

export default App;
