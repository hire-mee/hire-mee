import React from 'react';
import axios from 'axios';

import { Briefcase, GraphUp, Trophy, GeoAlt, PersonFill, GearFill, PauseFill, ArrowClockwise, BoxArrowRight } from 'react-bootstrap-icons';

import MapContainer from './components/Map/Map.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Statistics from './components/Statistics/Statistics.jsx';
import Jobs from './components/jobs/Jobs.jsx';
import Logout from './components/Logout/Logout.jsx';
import Profile from './components/Profile/Profile.jsx'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      page: 'Jobs',
      users: '',
      currentUser: '',
      logoutBox: false,
      appliedJobs:[{positionTitle: "Full Stack WebDeveloper",companyName: "Google", salary: 150000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"https://www.google.com/",descr:"not real" },{positionTitle: "Front End WebDeveloper",companyName: "Facebook", salary: 100000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"https://www.google.com/",descr:"not real" },{positionTitle: "Back End WebDeveloper",companyName: "Amazon", salary: 120000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"https://www.google.com/",descr:"not real" }],

      rejected: [{positionTitle: "Full Stack WebDeveloper",companyName: "Google", salary: 150000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"https://www.google.com/",descr:"not real" },{positionTitle: "Front End WebDeveloper",companyName: "Facebook", salary: 100000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"https://www.google.com/",descr:"not real" }],

      offered: [{positionTitle: "Full Stack Web Developer",companyName: "Amazon", salary: 150000, submitDate: "06/05/2020",  deadLine: "06/19/2020",loc:"Los Angeles, Ca", urlLink:"https://www.google.com/",descr:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }],

      desired: 120000
    };
    this.componentHandler = this.componentHandler.bind(this);
    this.componentStartUp = this.componentStartUp.bind(this);
    this.getData = this.getData.bind(this);
    this.changePage = this.changePage.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.componentSignOut = this.componentSignOut.bind(this);
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
                <div className="category" data-letter="Logout" onClick={this.handleModal}><BoxArrowRight color="white" /> Logout</div>
              </div>
            </div>
            <div className="Header">
              <div className="Header-title">{this.state.page}</div>
              <div className="Profile-area"><Profile userData={this.state.currentUser}/></div>
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
        return <Jobs applied={this.state.appliedJobs} desired={this.state.desired} offered={this.state.offered} rejected={this.state.rejected}/>
      } else if (this.state.page === 'Statistics') {
        return <Statistics user={this.state.currentUser} />
      } else if (this.state.page === 'Leaderboard') {

      } else if (this.state.page === 'Map') {
        return <MapContainer />
      } else if (this.state.page === 'Settings') {

      }
    } else {
      return <SignUp />
    }
  }

  componentSignOut() {
    if (this.state.logoutBox === true) {
      return <Logout user={this.state.currentUser} show={this.state.logoutBox} handleModal={this.handleModal} logFunction={this.logFunction.bind(this)} defaultPage={this.defaultPage.bind(this)} />
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

  defaultPage() {
    this.setState({
      page: 'Jobs'
    })
  }

  logFunction() {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }


  handleModal() {
    this.setState({logoutBox: !this.state.logoutBox})
  }

  render() {
    return (
      <div>
        <div className="StartUp">
          {this.componentStartUp()}
          {this.componentSignOut()}
          <button onClick={this.logFunction.bind(this)}>LOGGED IN</button>
        </div>
      </div>
    );
  }
}

export default App;
